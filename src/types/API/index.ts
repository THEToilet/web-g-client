import {Addr} from "../domain";

export type Status = {
    code: string;
    message: string;
    type: string;
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

export type BackEndUserInfo = {
    userID: string;
    publicIP: string
    publicPort: number
    privateIP: string
    privatePort: number
    latitude: number
    longitude: number
}