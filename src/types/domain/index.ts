import {InitialState} from "../../reducers/connectionStatus";

export type UserInformation = {
    publicIP: string;
    publicPort: number;
    privateIP: string;
    privatePort: number;
    latitude: number;
    longitude: number;
};

export type ActionType =
    | 'NAT' | 'GEO_LOCATION' | 'WEB_SOCKET_CONNECT';


export type SignalingType =
    | 'REGISTER' | 'UPDATE' | 'STATIC_SEARCH' | 'DYNAMIC_SEARCH' | 'DELETE' | 'SEND';

export type GeoLocation =
    { lat: number, lng: number };