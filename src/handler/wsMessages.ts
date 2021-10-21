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
        this.sendMessage(JSON.stringify(message))
    }

    sendRegister(userInfo: UserInfo) {
        const message: RegisterRequest = {
            type: 'register',
            geoLocation: {
                latitude: userInfo.geoLocation.latitude,
                longitude: userInfo.geoLocation.longitude,
            },
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendUpdate(userInfo: UserInfo) {
        const message: UpdateRequest = {
            type: 'update',
            userInfo: userInfo,
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendStaticSearch(geoLocation: GeoLocation, searchDistance: number) {
        const message: SearchRequest = {
            type: 'search',
            searchType: 'static',
            searchDistance: searchDistance,
            geoLocation: geoLocation,
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendDynamicSearch(geoLocation: GeoLocation, searchDistance: number) {
        const message: SearchRequest = {
            type: 'search',
            searchType: 'dynamic',
            searchDistance: searchDistance,
            geoLocation: geoLocation,
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendDelete() {
        const message: DeleteRequest = {
            type: 'delete',
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendSend() {
        const message: SendRequest = {
            type: 'delete',
            message: 'test'
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendOffer(sdp: string) {
        const message: OfferMessage = {
            type: 'offer',
            sdp: sdp,
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendAnswer(sdp: string) {
        const message: AnswerMessage = {
            type: 'answer',
            sdp: sdp,
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendClose() {
        const message: CloseRequest = {
            type: 'close',
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