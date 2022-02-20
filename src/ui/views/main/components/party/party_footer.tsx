import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import { RootState } from "state/root";
import { activeParty } from "state/selectors/active";
import { selectPrefsFlag } from "state/selectors/prefs";
import { parse_presence, PresenceStatus, UserPreferenceFlags } from "state/models";

import { UserAvatar } from "../user_avatar";
import { VectorIcon } from "ui/components/common/icon";
import { Link } from "ui/components/history";
import { Spinner } from "ui/components/common/spinners/spinner";

import { CogwheelIcon } from "ui/assets/icons";
import { SpeakerIcon } from "ui/assets/icons";
import { SpeakerDeafIcon } from "ui/assets/icons";
import { MicrophoneIcon } from "ui/assets/icons";
import { MicrophoneMuteIcon } from "ui/assets/icons";

let status_selector = createSelector(
    (state: RootState) => state.user.user!,
    (state: RootState) => state.party.parties,
    activeParty,
    (user, parties, active_party) => {
        if(!active_party || active_party == '@me') return PresenceStatus.Online;
        let party = parties.get(active_party);

        if(party) {
            let member = party.members.get(user.id);

            if(member) {
                return parse_presence(member.presence).status;
            }
        }

        return PresenceStatus.Offline;
    }
)

let footer_selector = createStructuredSelector({
    user: (state: RootState) => state.user.user,
    is_light_theme: selectPrefsFlag(UserPreferenceFlags.LightMode),
    status: status_selector,
});

import "./party_footer.scss";
export const PartyFooter = React.memo(() => {
    let { user, is_light_theme, status } = useSelector(footer_selector),
        [mute, setMute] = useState(false),
        [deaf, setDeaf] = useState(false),
        user_info;

    if(user) {
        user_info = (
            <>
                <UserAvatar nickname={user.username} user={user} status={status} is_light_theme={is_light_theme} />

                <div className="ln-username">
                    <span className="ln-username__name ui-text">
                        {user.username}
                    </span>
                    <span className="ln-username__discrim ui-text">
                        #{user.discriminator.toString(16).toUpperCase().padStart(4, '0')}
                    </span>
                </div>
            </>
        );
    } else {
        user_info = (
            <Spinner size="100%" />
        );
    }

    return (
        <footer className="ln-party-footer">
            <div className="ln-party-footer__user">
                {user_info}
            </div>

            <div className="ln-party-footer__settings">
                <div onClick={() => setMute(!mute)} title={mute ? 'Unmute' : 'Mute'}>
                    <VectorIcon src={mute ? MicrophoneMute : Microphone} />
                </div>
                <div onClick={() => setDeaf(!deaf)} title={deaf ? 'Undeafen' : 'Deafen'}>
                    <VectorIcon src={deaf ? SpeakerDeaf : Speaker} />
                </div>
                <Link href="/settings" title="Settings">
                    <VectorIcon src={CogwheelIcon} />
                </Link>
            </div>
        </footer>
    );
})