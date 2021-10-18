import {UserInfo} from "../types/domain";
import {DeleteRequest, PongRequest, RegisterRequest, SearchRequest, SendRequest, UpdateRequest} from "../types/api";

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
            geoLocation: {
                latitude: userInfo.geoLocation.latitude,
                longitude: userInfo.geoLocation.longitude,
            },
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendStaticSearch(searchDistance: number) {
        const message: SearchRequest = {
            type: 'search',
            searchType: 'static',
            searchDistance: searchDistance,
        }
        this.sendMessage(JSON.stringify(message))
    }

    sendDynamicSearch(searchDistance: number) {
        const message: SearchRequest = {
            type: 'search',
            searchType: 'dynamic',
            searchDistance: searchDistance,
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

    sendOffer() {
        this.sendMessage(JSON.stringify({
            type: 'offer',
            message: 'ssss',
        }))
    }

    sendAnswer() {
        this.sendMessage(JSON.stringify({
            type: 'answer',
            message: 'ssss',
        }))
    }

    sendClose() {
        this.sendMessage(JSON.stringify({
            type: 'close',
            message: 'ssss',
        }))
    }

    sendCandidate() {
        this.sendMessage(JSON.stringify({
            type: 'candidate',
            message: 'ssss',
        }))
    }

}