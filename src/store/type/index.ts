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

export type GSettingStatus = {
    searchDistance: number;
    searchType: SearchType;
}

export type GSignalingState = {
    userInfo: UserInfo;
    surroundingUserList: UserInfo[];
    isRegister: boolean;
    userID: string;
}