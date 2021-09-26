import {InitialState} from "../reducers/connectionStatus";
import {useEffect, useState} from "react";
import {ActionType, SignalingType} from "../types/domain";
import {GeoLocation} from '../types/domain'


const useConnection = (message: string, sendMessage: (message: String) => void, geoLocation: GeoLocation) => {
    const [connStatus, setConnStatus] = useState<ActionType>('NAT')
    const [wsStatus, setWSStatus] = useState<SignalingType>('REGISTER')

    useEffect(() => {
        console.log(message)
    }, [message])

    useEffect(() => {
        const timeoutUpdate = setTimeout(() => {
            if (connStatus === 'WEB_SOCKET_CONNECT') {
                setWSStatus('UPDATE')
            }
        }, 2000);
        const timeoutSearch = setTimeout(() => {
            if (connStatus === 'WEB_SOCKET_CONNECT') {
                setWSStatus('STATIC_SEARCH')
            }
        }, 5000);
        return () => {
            clearTimeout(timeoutUpdate);
            clearTimeout(timeoutSearch);
        };
    }, [wsStatus])

    useEffect(() => {
        switch (connStatus) {
            case 'NAT':
                setConnStatus('GEO_LOCATION')
                break
            case "GEO_LOCATION":
                setConnStatus('WEB_SOCKET_CONNECT')
                break
            case "WEB_SOCKET_CONNECT":
                switch (wsStatus) {
                    case "REGISTER":
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
                        break
                    case "UPDATE":
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
                        break
                    case "DYNAMIC_SEARCH":
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
                        break
                    case "STATIC_SEARCH":
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
                        break
                    case "DELETE":
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
                        break
                    case "SEND":
                        sendMessage(JSON.stringify({
                            type: 'send',
                            message: 'ssss',
                        }))
                        break
                    default:
                        break
                }
                break
            default:
                break
        }

    }, [connStatus, wsStatus])
}

export default useConnection