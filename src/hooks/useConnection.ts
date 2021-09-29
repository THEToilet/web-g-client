import {useEffect, useState} from "react";

import {setIsRegister, setSurroundingUserList, setUserID} from '../slices/gSignalingStatus'
import {getGSignalingStatus} from '../selector'
import {useDispatch, useSelector} from "react-redux";
import {JudgeStatus, RegisterResponse, SearchResponse, Status} from "../types/API";

const useConnection = (message: string, sendMessage: (message: String) => void) => {
    const [isSendRegisterOnce, setIsRegisterOnce] = useState<boolean>(false)

    const {isRegister, userInfo} = useSelector(getGSignalingStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("-----message-------")
        console.log(message)
        if (message === "") {
            return
        }
        try {
            const status = JSON.parse(message) as Status
            if(typeof status === 'undefined'){
                console.log('undefined')
                return;
            }
            const judgeStatus = JSON.parse(message) as JudgeStatus

            switch (judgeStatus.status.type) {
                case 'register':
                    const registerResponse: RegisterResponse = JSON.parse(message) as RegisterResponse
                    console.log("registered")
                    dispatch(setIsRegister())
                    dispatch(setUserID(registerResponse.userID))
                    console.log(registerResponse)
                    break
                case 'search':
                    console.log("search")
                    const searchResponse: SearchResponse = JSON.parse(message) as SearchResponse
                    dispatch(setSurroundingUserList(searchResponse.searchedUserList))
                    console.log(searchResponse)
                    break
                default:
                    break
            }
        } catch (e) {
            console.log(e)
        }
    }, [message, dispatch])


    const sendRegister = () => {
        sendMessage(JSON.stringify({
            type: 'register',
            userInfo: {
                userID: '',
                publicIP: '127.0.0.1',
                publicPort: 8080,
                privateIP: '127.0.0.1',
                privatePort: 8080,
                latitude: userInfo.geoLocation.lat,
                longitude: userInfo.geoLocation.lng,
            }
        }))
    }

    const sendUpdate = () => {
        sendMessage(JSON.stringify({
            type: 'update',
            userInfo: {
                userID: '',
                publicIP: '127.0.0.1',
                publicPort: 8080,
                privateIP: '127.0.0.1',
                privatePort: 8080,
                latitude: userInfo.geoLocation.lat,
                longitude: userInfo.geoLocation.lng,
            }
        }))
    }

    const sendStaticSearch = () => {
        sendMessage(JSON.stringify({
            type: 'search',
            userInfo: {
                userID: '',
                publicIP: '127.0.0.1',
                publicPort: 8080,
                privateIP: '127.0.0.1',
                privatePort: 8080,
                latitude: userInfo.geoLocation.lat,
                longitude: userInfo.geoLocation.lng,
            },
            searchType: 'static',
            searchDistance: 100,
        }))
    }
    /*

    const sendDynamicSearch = () => {
        sendMessage(JSON.stringify({
            type: 'search',
            userInfo: {
                userID: '',
                publicIP: '127.0.0.1',
                publicPort: 8080,
                privateIP: '127.0.0.1',
                privatePort: 8080,
                latitude: geoLocation.lat,
                longitude: geoLocation.lng,
            },
            searchType: 'dynamic',
            searchDistance: 100,
        }))
    }

    const sendDelete = () => {
        sendMessage(JSON.stringify({
            type: 'delete',
            userInfo: {
                userID: '',
                publicIP: '127.0.0.1',
                publicPort: 8080,
                privateIP: '127.0.0.1',
                privatePort: 8080,
                latitude: geoLocation.lat,
                longitude: geoLocation.lng,
            }
        }))
    }

    const sendSend = () => {
        sendMessage(JSON.stringify({
            type: 'send',
            message: 'ssss',
        }))
    }

     */

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