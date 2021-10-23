import produce from "immer";
import { GatewayMessageDiscriminator } from "worker/gateway/msg";
import { PartyMember } from "state/models";
import { Action, Type } from "../actions";

import { Snowflake, Party, Room } from "../models";
import { GatewayEventCode } from "worker/gateway/event";

export interface IParty {
    party: Party,
    rooms: Room[],
    members: Map<Snowflake, PartyMember>,
    needs_refresh: boolean,
}

export interface IPartyState {
    parties: Map<Snowflake, IParty>,
    last_channel: Map<Snowflake, Snowflake>,
    active_party?: Snowflake,
    //sorted: Snowflake[]
}

const DEFAULT_STATE: IPartyState = {
    parties: new Map(),
    last_channel: new Map(),
    //sorted: [],
};

export function partyReducer(state: IPartyState | null | undefined, action: Action) {
    state = state || DEFAULT_STATE;

    switch(action.type) {
        case Type.SESSION_EXPIRED: return DEFAULT_STATE;

        case Type.PARTY_LOADED: return produce(state, draft => {
            let party = draft.parties.get(action.party_id);

            if(party) {
                action.rooms.sort((a, b) => a.sort_order - b.sort_order);

                for(let room of action.rooms) {
                    if(__DEV__ && room.party_id !== action.party_id) {
                        alert("Mismatch in fetched rooms!");
                    }

                    party.rooms.push(room);
                }

                party.needs_refresh = false;
            }
        });
        case Type.MEMBERS_LOADED: return produce(state, draft => {
            let party = draft.parties.get(action.party_id);
            if(party) {
                for(let member of action.members) {
                    party.members.set(member.user!.id, member);
                }
            }
        });
        case Type.HISTORY_UPDATE: {
            let [, party_id, channel_id] = action.ctx.parts;

            return produce(state, draft => {
                let party = draft.parties.get(party_id);
                if(party) {
                    let room = party.rooms.find(room => room.id == channel_id);

                    if(room) {
                        draft.last_channel.set(party_id, channel_id);
                    }
                }
            });
        }
        case Type.GATEWAY_EVENT: {
            switch(action.payload.t) {
                case GatewayMessageDiscriminator.Ready: {
                    let p = action.payload.p;

                    let parties: Map<Snowflake, IParty> = new Map();
                    for(let party of p.parties) {
                        parties.set(party.id, {
                            party,
                            rooms: [],
                            members: new Map(),
                            needs_refresh: true
                        });
                    }
                    return { ...state, parties };
                }
                case GatewayMessageDiscriminator.Event: {
                    let p = action.payload.p;
                    switch(p.o) {
                        case GatewayEventCode.PartyCreate:
                        case GatewayEventCode.PartyUpdate: {
                            let party = p.p;

                            return produce(state, draft => {
                                let iparty = draft.parties.get(party.id);
                                if(iparty) {
                                    iparty.party = party;
                                } else {
                                    draft.parties.set(party.id, {
                                        party,
                                        rooms: [],
                                        members: new Map(),
                                        needs_refresh: true,
                                    });
                                }
                            });
                        }
                        case GatewayEventCode.PartyDelete: {
                            let id = p.p.id;

                            return produce(state, draft => {
                                draft.parties.delete(id);
                            });
                        }
                        case GatewayEventCode.PresenceUpdate: {
                            let { user, party: party_id, presence } = p.p;
                            if(!party_id) break;

                            return produce(state, draft => {
                                let party = draft.parties.get(party_id!);
                                if(!party) return;

                                let member = party.members.get(user.id);
                                if(!member) return;

                                member.presence = presence;
                            });
                        }
                        case GatewayEventCode.MemberUpdate:
                        case GatewayEventCode.MemberAdd: {
                            let member = p.p;
                            let { party_id, user } = member, id = user!.id;

                            return produce(state, draft => {
                                let party = draft.parties.get(party_id);
                                if(!party) return;

                                let existing = party.members.get(id) || {};

                                party.members.set(id, { ...existing, ...member });
                            });
                        }
                        case GatewayEventCode.MemberRemove: {
                            let member = p.p;
                            let { party_id, user } = member, id = user!.id;

                            return produce(state, draft => {
                                let party = draft.parties.get(party_id);
                                if(!party) return;

                                party.members.delete(id);
                            });
                        }
                        default: break;
                    }

                    break;
                }
            }
            break;
        }

    }

    return state;
}