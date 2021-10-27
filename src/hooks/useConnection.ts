import {useEffect, useState} from "react";

import {setIsRegister, setSurroundingUserList, setUserID} from '../store/slices/gSignalingStatus'
import {setDestinationUserID} from '../store/slices/p2pStatus'
import {getGSetting, getGSignalingStatus} from '../store/selector'
import {useDispatch, useSelector} from "react-redux";
import {
    AnswerMessage, CloseRequest,
    DeleteResponse,
    IceCandidateRequest,
    JudgeMessageType, OfferMessage,
    RegisterResponse,
    SearchResponse,
    UpdateResponse
} from "../types/api";
import {WSMessages} from "../handler/wsMessages";

const useConnection = (rawMessage: string, wsMessage: WSMessages, setICECandidate: (iceCandidate: RTCIceCandidate) => void, setOffer: (sdp: string, destination: string) => Promise<void>, setAnswer: (sdp: string) => Promise<void>, disconnect: () => void) => {
    const [isSendRegisterOnce, setIsRegisterOnce] = useState<boolean>(false)

    const {isRegister, userInfo} = useSelector(getGSignalingStatus)
    const {searchDistance} = useSelector(getGSetting)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(new Date(), " : -----rawMessage-------")
        console.log(rawMessage)
        if (rawMessage === "") {
            console.error("message is empty")
            return
        }
        try {
            const messageType = JSON.parse(rawMessage) as JudgeMessageType
            if (typeof messageType === 'undefined') {
                console.error("message is undefined")
                return;
            }
            switch (messageType.type) {
                case 'ping':
                    console.log(new Date(), ': ping')
                    wsMessage.sendPong()
                    break
                case 'register':
                    console.log(new Date(), ': registered')
                    const registerResponse: RegisterResponse = JSON.parse(rawMessage) as RegisterResponse
                    dispatch(setIsRegister())
                    dispatch(setUserID(registerResponse.userID))
                    break
                case 'update':
                    console.log(new Date(), ': update')
                    const updateResponse: UpdateResponse = JSON.parse(rawMessage) as UpdateResponse
                    console.log(new Date(), updateResponse)
                    break
                case 'search':
                    // NOTE: 検索方式にかかわらず返ってくるのは近隣のユーザリスト
                    console.log(new Date(), ': search')
                    const searchResponse: SearchResponse = JSON.parse(rawMessage) as SearchResponse
                    dispatch(setSurroundingUserList(searchResponse.surroundingUserList))
                    break
                case 'delete':
                    console.log(new Date(), ': delete')
                    const deleteResponse: DeleteResponse = JSON.parse(rawMessage) as DeleteResponse
                    console.log(new Date(), deleteResponse)
                    break
                case 'offer':
                    console.log(new Date(), ': offer')
                    const offerMessage: OfferMessage = JSON.parse(rawMessage) as OfferMessage
                    dispatch(setDestinationUserID(offerMessage.destination))
                    setOffer(offerMessage.sdp, offerMessage.destination).catch(
                        e => {
                            console.error(e)
                        }
                    )
                    break
                case 'answer':
                    console.log(new Date(), ': answer')
                    const answerMessage: AnswerMessage = JSON.parse(rawMessage) as AnswerMessage
                    setAnswer(answerMessage.sdp).catch(
                        e => {
                            console.error(e)
                        }
                    )
                    break
                case 'ice':
                    console.log(new Date(), ': ice')
                    const iceCandidate: IceCandidateRequest = JSON.parse(rawMessage) as IceCandidateRequest
                    console.log(iceCandidate.ice)
                    // REFERENCE: https://mebee.info/2020/10/30/post-20771/
                    const t : RTCIceCandidate = JSON.parse(JSON.stringify(iceCandidate.ice)) as RTCIceCandidate
                    console.log(t)
                    const ice = new RTCIceCandidate(t)
                    setICECandidate(ice)
                    break
                case 'close':
                    console.log(new Date(), ': close')
                    const closeRequest: CloseRequest = JSON.parse(rawMessage) as CloseRequest
                    console.log(closeRequest.destination)
                    disconnect()
                    break
                default:
                    break
            }
        } catch (e) {
            console.log(e)
        }

    }, [dispatch, rawMessage])


    useEffect(() => {
        const timeoutUpdate = setInterval(() => {
            if (isRegister) {
                wsMessage.sendUpdate(userInfo)
            }
        }, 5000);
        const timeoutSearch = setInterval(() => {
            if (isRegister) {
                wsMessage.sendStaticSearch(userInfo.geoLocation, searchDistance)
            }
        }, 5000);
        return () => {
            clearTimeout(timeoutUpdate);
            clearTimeout(timeoutSearch);
        };
    }, [isRegister])


    useEffect(() => {
        if (!isRegister && !isSendRegisterOnce) {
            wsMessage.sendRegister(userInfo)
            setIsRegisterOnce(true)
        }
    }, [isRegister, isSendRegisterOnce])
}

export default useConnection