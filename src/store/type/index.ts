import {UserInfo} from "../../types/domain";

export type ActionType =
    | 'NAT'
    | 'GEO_LOCATION'
    | 'WEB_SOCKET_CONNECT';

type WebSocketConnectionType =
    | 'CONNECTED'
    | 'CONNECTING'
    | 'RECONNECTED'
    | 'RECONNECTING';

export type WebSocketConnectionState = {
    wsConnectionType: WebSocketConnectionType
}

export type SearchType =
    | 'DYNAMIC'
    | 'STATIC';

export type Message = {
    userID: string
    body: string
}

export type GSettingStatus = {
    searchDistance: number;
    searchType: SearchType;
}

export type GSignalingState = {
    userInfo: UserInfo;
    userName: string;
    surroundingUserList: UserInfo[];
    isRegister: boolean;
    userID: string;
}

export type P2PState = {
    destinationUserID: string
    messageList: Message[]
}