import {useEffect, useState} from "react";
import {ActionType, SignalingType} from "../types/domain";
import {GeoLocation} from '../types/domain'

import {setIsRegister, setSurroundingUserList} from '../slices/gSignalingStatus'
import {getGSignalingStatus} from '../selector'
import {useDispatch, useSelector} from "react-redux";
import {RegisterResponse, SearchResponse, Status} from "../types/API";

const useConnection = (message: string, sendMessage: (message: String) => void, geoLocation: GeoLocation) => {
    //const [connStatus, setConnStatus] = useState<ActionType>('NAT')
    //const [wsStatus, setWSStatus] = useState<SignalingType>('REGISTER')

    const {isRegister} = useSelector(getGSignalingStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(message)
        /*
        const status : Status = JSON.parse(message) as Status
        switch (status.type){
            case 'register':
                const registerResponse : RegisterResponse = JSON.parse(message) as RegisterResponse
                break
            case 'search':
                const search : SearchResponse = JSON.parse(message) as SearchResponse
                dispatch(setSurroundingUserList(search.searchedUserList))
                break
            default:
                break
        }

         */
    }, [message])

    useEffect(() => {
        const timeoutUpdate = setTimeout(() => {
            if (isRegister) {
                sendUpdate()
            }
        }, 2000);
        const timeoutSearch = setTimeout(() => {
            if (isRegister) {
                sendStaticSearch()
            }
        }, 5000);
        return () => {
            clearTimeout(timeoutUpdate);
            clearTimeout(timeoutSearch);
        };
    }, [])

    const sendRegister = () => {
        sendMessage(JSON.stringify({
            type: 'register',
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

    const sendUpdate = () => {
        sendMessage(JSON.stringify({
            type: 'update',
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

    const sendStaticSearch = () => {
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
            searchType: 'static',
            searchDistance: 100,
        }))
    }

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

    useEffect(() => {
        if (!isRegister) {
            sendRegister()
            // TODO: ここは移動する
            dispatch(setIsRegister())
        }
    }, [isRegister])
}

export default useConnection