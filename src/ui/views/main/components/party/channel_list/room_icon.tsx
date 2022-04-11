import { createMemo, Show } from "solid-js";

import type { Room } from "state/models";

import { room_avatar_url } from "config/urls";

import { Avatar } from "ui/components/common/avatar";
import { VectorIcon } from "ui/components/common/icon";

import { Icons } from "lantern-icons";

interface IRoomIconProps {
    room: DeepReadonly<Room>,
}

export function RoomIcon(props: IRoomIconProps) {
    return (
        <div className="ln-channel-list__icon">
            <div className="ln-channel-list__icon-wrapper">
                <Show when={props.room.avatar} fallback={<RoomHashIcon room={props.room} />}>
                    <Avatar url={room_avatar_url(props.room.id, props.room.avatar!)} username={props.room.name} />
                </Show>
            </div>
        </div>
    );
}

function RoomHashIcon(props: IRoomIconProps) {
    let subicon = createMemo(() => {
        let flags = props.room.flags;

        // TODO: Rooms with overwrites
        if((flags & 16) == 16) {
            return Icons.TriangleAlert;
        } else if((flags & 64) == 64) {
            return Icons.Lock;
        }
        return;
    });

    return (
        <>
            <VectorIcon id={Icons.Hash} />

            <Show when={subicon()}>
                {icon => (
                    <div className="ln-channel-list__subicon">
                        <VectorIcon id={icon} />
                    </div>
                )}
            </Show>
        </>
    );
}