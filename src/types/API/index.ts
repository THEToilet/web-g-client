import {Addr} from "../domain";

export type Status = {
    type: string;
    code: string;
    message: string;
}

export type SearchResponse = {
    status: Status
    searchedUserList: BackEndUserInfo[]
}

export type RegisterResponse = {
    status: Status
    userID: string
}

export type StunResponse = {
    addr: Addr
}

export type JudgeStatus = {
    status: Status
}

export type JudgeMessageType = {
    type : string
}

export type BackEndUserInfo = {
    userID: string;
    publicIP: string
    publicPort: number
    privateIP: string
    privatePort: number
    latitude: number
    longitude: number
}