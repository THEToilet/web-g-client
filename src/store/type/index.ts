import {UserInfo} from "../../types/domain";
import {WSMessages} from "../../handler/wsMessages";

export type ActionType =
    | 'NAT'
    | 'GEO_LOCATION'
    | 'WEB_SOCKET_CONNECT';

export type SignalingType =
    | 'REGISTER'
    | 'UPDATE'
    | 'STATIC_SEARCH'
    | 'DYNAMIC_SEARCH'
    | 'DELETE'
    | 'SEND';

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

type ConnectionType =
    | 'NAT'
    | 'G_LOC_ON'
    | 'WEB_RTC';

export type ConnectionState = {
    connectionType: ConnectionType
}

export type P2PState = {
    isOffer: boolean,
    rtcPeerConnection: RTCPeerConnection,
}

export type VideoRef = {
    remoteVideo: HTMLVideoElement,
    localVideo: HTMLVideoElement,
}
