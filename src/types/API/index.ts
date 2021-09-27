import {Addr, UserInfo} from "../domain";

export type Status = {
    type: string;
    code: string;
    message: string;
}

export type SearchResponse = {
    status: Status
    searchedUserList: UserInfo[]
}

export type RegisterResponse = {
    status: Status
    userID: string
}

export type StunResponse = {
    addr: Addr
}