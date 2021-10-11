import {BackEndUserInfo} from "../API";

export type UserInfo = {
    private: Addr;
    public: Addr;
    geoLocation: GeoLocation;
};

export type Addr = {
    ip: string;
    port: number;
}

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

export type GeoLocation = {
    lat: number;
    lng: number;
};

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
    // TODO: フロントの型に変換する
    surroundingUserList: BackEndUserInfo[];
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

