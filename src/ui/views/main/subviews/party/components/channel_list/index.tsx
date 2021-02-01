import React from "react";

export interface IChannelListProps {
    channels: string[],
}

import Hash from "icons/glyphicons-pro/glyphicons-basic-2-3/svg/individual-svg/glyphicons-basic-740-hash.svg";
import { Glyphicon } from "ui/components/common/glyphicon";
import { Avatar } from "ui/components/common/avatar";

import "./channel_list.scss";
import { fnv1a } from "client/fnv";
export const ChannelList = React.memo((props: IChannelListProps) => {
    let colors = ['yellow', 'lightblue', 'lightgreen', 'lightcoral', 'orange', 'plum'];

    return (
        <ul className="ln-channel-list ln-vertical-scroll ln-scroll-fixed">
            {props.channels.map((channel, i) => (
                <li key={channel} className="ln-channel-list-channel">
                    <Avatar text={channel.slice(0, 1)} username={channel} backgroundColor={(() => {
                        let hash = fnv1a((i * 12345).toString());
                        //console.log(hash, hash % 4);
                        return colors[hash % colors.length];
                    })()} />
                    <Glyphicon src={Hash} />
                    <div className="ln-channel-list-name"><span>{channel}</span></div>
                </li>
            ))}
        </ul>
    );
});