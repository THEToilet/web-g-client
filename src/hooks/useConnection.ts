import {InitialState} from "../reducers/connectionStatus";
import {useEffect, useState} from "react";
import {ActionType, SignalingType} from "../types/domain";


const useConnection = (message: string, sendMessage: (message: String) => void) => {
    const [connStatus, setConnStatus] = useState<ActionType>('NAT')
    const [wsStatus, setWSStatus] = useState<SignalingType>('REGISTER')

    useEffect(() => {
        switch (connStatus){
            case 'NAT':
                break
            case "GEO_LOCATION":
                break
            case "WEB_SOCKET_CONNECT":
                break
        }

    }, [message])
}

export default useConnection