import {useEffect, useState} from "react";

import {setIsRegister, setSurroundingUserList, setUserID} from '../slices/gSignalingStatus'
import {getGSetting, getGSignalingStatus} from '../selector'
import {useDispatch, useSelector} from "react-redux";
import {JudgeMessageType, JudgeStatus, RegisterResponse, SearchResponse, Status} from "../types/API";
import useWebSocket from "./useWebSocket";

const useConnection = (rawMessage: string, sendMessage: (message: String) => void) => {
    const [isSendRegisterOnce, setIsRegisterOnce] = useState<boolean>(false)

    const {isRegister, userInfo} = useSelector(getGSignalingStatus)
    const {searchDistance} = useSelector(getGSetting)
    const dispatch = useDispatch()


    useEffect(() => {
        // この方式じゃなくてonMessageのほうがいいかも
        console.log("-----rawMessage-------")
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
                    console.log('ping')
                    sendPong()
                    break
                case 'register':
                    console.log('registered')
                    const registerResponse: RegisterResponse = JSON.parse(rawMessage) as RegisterResponse
                    dispatch(setIsRegister())
                    dispatch(setUserID(registerResponse.userID))
                    break
                case 'update':
                    console.log('update')
                    break
                case 'search':
                    // 検索方式にかかわらず返ってくるのは近隣のユーザリスト
                    console.log('search')
                    const searchResponse: SearchResponse = JSON.parse(rawMessage) as SearchResponse
                    dispatch(setSurroundingUserList(searchResponse.searchedUserList))
                    break
                case 'delete':
                    console.log('delete')
                    break
                case 'offer':
                    console.log('offer')
                    // setOffer(message)
                    break
                case 'answer':
                    console.log('answer')
                    // setAnswer(message)
                    break
                case 'candidate':
                    console.log('candidate')
                    // handleICECandidate(message)
                    break
                case 'close':
                    console.log('close')
                    // closeProcess()
                    break
                default:
                    break
            }
        } catch (e) {
            console.log(e)
        }

    }, [dispatch, rawMessage])

    const sendPong = () => {
        sendMessage(JSON.stringify({
            type: 'pong'
        }))
    }

    const sendRegister = () => {
        sendMessage(JSON.stringify({
            type: 'register'
        }))
    }

    const sendUpdate = () => {
        sendMessage(JSON.stringify({
            type: 'update',
            geoLocation: {
                latitude: userInfo.geoLocation.lat,
                longitude: userInfo.geoLocation.lng,
            }
        }))
    }

    const sendStaticSearch = () => {
        sendMessage(JSON.stringify({
            type: 'search',
            searchType: 'static',
            searchDistance: searchDistance,
        }))
    }

    const sendDynamicSearch = () => {
        sendMessage(JSON.stringify({
            type: 'search',
            searchType: 'dynamic',
            searchDistance: 100,
        }))
    }

    const sendDelete = () => {
        sendMessage(JSON.stringify({
            type: 'delete',
        }))
    }

    const sendSend = () => {
        sendMessage(JSON.stringify({
            type: 'send',
            message: 'ssss',
        }))
    }
    const sendOffer = () => {
        sendMessage(JSON.stringify({
            type: 'offer',
            message: 'ssss',
        }))
    }
    const sendAnswer = () => {
        sendMessage(JSON.stringify({
            type: 'answer',
            message: 'ssss',
        }))
    }
    const sendClose = () => {
        sendMessage(JSON.stringify({
            type: 'close',
            message: 'ssss',
        }))
    }
    const sendCandidate = () => {
        sendMessage(JSON.stringify({
            type: 'candidate',
            message: 'ssss',
        }))
    }

    useEffect(() => {
        const timeoutUpdate = setInterval(() => {
            if (isRegister) {
                sendUpdate()
            }
        }, 2000);
        const timeoutSearch = setInterval(() => {
            if (isRegister) {
                sendStaticSearch()
            }
        }, 2000);
        return () => {
            clearTimeout(timeoutUpdate);
            clearTimeout(timeoutSearch);
        };
    }, [isRegister, sendStaticSearch, sendUpdate])


    useEffect(() => {
        if (!isRegister && !isSendRegisterOnce) {
            sendRegister()
            setIsRegisterOnce(true)
        }
    }, [isRegister, isSendRegisterOnce, sendRegister])
}

export default useConnection