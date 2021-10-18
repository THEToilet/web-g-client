import {useEffect, useState} from "react";

import {setIsRegister, setSurroundingUserList, setUserID} from '../store/slices/gSignalingStatus'
import {getGSetting, getGSignalingStatus} from '../store/selector'
import {useDispatch, useSelector} from "react-redux";
import {JudgeMessageType, RegisterResponse, SearchResponse} from "../types/api";
import {WSMessages} from "../handler/wsMessages";

const useConnection = (rawMessage: string, sendMessage: (message: String) => void) => {
    const [isSendRegisterOnce, setIsRegisterOnce] = useState<boolean>(false)

    const {isRegister, userInfo} = useSelector(getGSignalingStatus)
    const {searchDistance} = useSelector(getGSetting)
    const dispatch = useDispatch()
    const wsMessage = new WSMessages(sendMessage)

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
                    wsMessage.sendPong()
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
                    dispatch(setSurroundingUserList(searchResponse.surroundingUserList))
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


    useEffect(() => {
        const timeoutUpdate = setInterval(() => {
            if (isRegister) {
                wsMessage.sendUpdate(userInfo)
            }
        }, 2000);
        const timeoutSearch = setInterval(() => {
            if (isRegister) {
                wsMessage.sendStaticSearch(searchDistance)
            }
        }, 2000);
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