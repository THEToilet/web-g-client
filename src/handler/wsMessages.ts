import {GeoLocation, UserInfo} from "../types/domain";
import {
    AnswerMessage,
    CloseRequest,
    DeleteRequest, IceCandidateRequest, OfferMessage,
    PongRequest,
    RegisterRequest,
    SearchRequest,
    SendRequest,
    UpdateRequest
} from "../types/api";

export class WSMessages {
    constructor(private readonly sendMessage: any) {
    }

    sendPong() {
        const message: PongRequest = {
            type: 'pong'
        }
        this.sendMessage(JSON.stringify(message), "SEND-PONG")
    }

    sendRegister(userInfo: UserInfo) {
        const message: RegisterRequest = {
            type: 'register',
            geoLocation: {
                latitude: userInfo.geoLocation.latitude,
                longitude: userInfo.geoLocation.longitude,
            },
        }
        this.sendMessage(JSON.stringify(message), "SEND-REGISTER")
    }

    sendUpdate(userInfo: UserInfo) {
        const message: UpdateRequest = {
            type: 'update',
            userInfo: userInfo,
        }
        this.sendMessage(JSON.stringify(message), "SEND-UPDATE")
    }

    sendStaticSearch(geoLocation: GeoLocation, searchDistance: number, id: string) {
        const message: SearchRequest = {
            type: 'search',
            searchType: 'static',
            searchDistance: searchDistance,
            geoLocation: geoLocation,
            requestID: id
        }
        this.sendMessage(JSON.stringify(message), "SEND-STATIC-SEARCH")
    }

    sendDynamicSearch(geoLocation: GeoLocation, searchDistance: number, id: string) {
        const message: SearchRequest = {
            type: 'search',
            searchType: 'dynamic',
            searchDistance: searchDistance,
            geoLocation: geoLocation,
            requestID: id,
        }
        this.sendMessage(JSON.stringify(message), "SEND-DYNAMIC-SEARCH")
    }

    sendDelete() {
        const message: DeleteRequest = {
            type: 'delete',
        }
        this.sendMessage(JSON.stringify(message), "SEND-DELETE")
    }

    sendSend() {
        const message: SendRequest = {
            type: 'send',
            message: 'test'
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendOffer(sdp: string, destinationUserID: string) {
        const message: OfferMessage = {
            type: 'offer',
            sdp: sdp,
            destination: destinationUserID
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendAnswer(sdp: string, destinationUserID: string) {
        const message: AnswerMessage = {
            type: 'answer',
            sdp: sdp,
            destination: destinationUserID
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendClose(destinationUserID: string) {
        const message: CloseRequest = {
            type: 'close',
            destination: destinationUserID
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendCandidate(ice: string) {
        const message: IceCandidateRequest = {
            type: 'ice',
            ice: ice,
        }
        this.sendMessage(JSON.stringify(message))
    }
}