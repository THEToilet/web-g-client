import {GeoLocation, UserInfo} from "../domain";

//--------response----------
export type SearchResponse = {
    type: string
    message: string
    surroundingUserList: UserInfo[]
}

export type RegisterResponse = {
    type: string
    message: string
    userID: string
}

export type UpdateResponse = {
    type: string
    message: string
}

export type DeleteResponse = {
    type: string
    message: string
}

export type SendResponse = {
    type: string
    message: string
}

export type JudgeMessageType = {
    type: string
}
//----------request----------

export type PongRequest = {
    type: string
}

export type RegisterRequest = {
    type: string
    geoLocation: GeoLocation
}

export type UpdateRequest = {
    type: string
    userInfo: UserInfo
}

export type SearchRequest = {
    type: string
    searchType: string
    searchDistance: number
    geoLocation: GeoLocation
}

export type DeleteRequest = {
    type: string
}

export type SendRequest = {
    type: string
    message: string
}

// -----------P2P-----------
// request
export type IceCandidateRequest = {
    type: string
    ice: string
}

export type CloseRequest = {
    type: string
}

// response
export type IceCandidateResponse = {
    type: string
    ice: string
}
export type OfferMessage = {
    type: string
    sdp: string
}
export type AnswerMessage = {
    type: string
    sdp: string
}

//--------------------------