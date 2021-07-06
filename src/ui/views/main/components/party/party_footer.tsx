import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { RootState } from "state/root";

import { UserAvatar } from "../user_avatar";
import { Glyphicon } from "ui/components/common/glyphicon";
import { Link } from "ui/components/history";

import Cogwheel from "icons/glyphicons-pro/glyphicons-basic-2-4/svg/individual-svg/glyphicons-basic-137-cogwheel.svg";
import Speaker from "icons/glyphicons-pro/glyphicons-basic-2-4/svg/individual-svg/glyphicons-basic-186-volume-up.svg";
import SpeakerDeaf from "icons/glyphicons-pro/glyphicons-basic-2-4/svg/individual-svg/glyphicons-basic-184-volume-off.svg";
import Microphone from "icons/glyphicons-pro/glyphicons-basic-2-4/svg/individual-svg/glyphicons-basic-341-mic.svg";
import MicrophoneMute from "icons/glyphicons-pro/glyphicons-basic-2-4/svg/individual-svg/glyphicons-basic-342-mic-off.svg";

let footer_selector = createStructuredSelector({
    user: (state: RootState) => state.user.user,
    is_light_theme: (state: RootState) => state.theme.is_light,
});

import "./party_footer.scss";
export const PartyFooter = React.memo(() => {
    let { user, is_light_theme } = useSelector(footer_selector);

    let [mute, setMute] = useState(false);
    let [deaf, setDeaf] = useState(false);

    if(!user) return null;

    return (
        <footer className="ln-party-footer">
            <div className="ln-party-footer__user">
                <UserAvatar nickname={user.username} user={user} status="online" is_light_theme={is_light_theme} />

                <div className="ln-username">
                    <span className="ln-username__name">
                        {user.username}
                    </span>
                    <span className="ln-username__discrim">
                        #{user.discriminator.toString(16).toUpperCase().padStart(4, '0')}
                    </span>
                </div>
            </div>

            <div className="ln-party-footer__settings">
                <div onClick={() => setMute(!mute)}>
                    <Glyphicon src={mute ? MicrophoneMute : Microphone} />
                </div>
                <div onClick={() => setDeaf(!deaf)}>
                    <Glyphicon src={deaf ? SpeakerDeaf : Speaker} />
                </div>
                <Link href="/profile" title="Settings">
                    <Glyphicon src={Cogwheel} />
                </Link>
            </div>
        </footer>
    );
})