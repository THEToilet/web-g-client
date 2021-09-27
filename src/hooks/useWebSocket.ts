import {useEffect, useRef, useState} from "react";

import {connected, connecting, reconnected, reconnecting} from '../slices/wsConnectionStatus'
import {getWSConnection} from '../selector'
import {useDispatch, useSelector} from "react-redux";

const useWebSocket = () => {

    const [message, setMessage] = useState<string>("")
    const socketRef = useRef<WebSocket>(null!)

    const {wsConnectionType} = useSelector(getWSConnection)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("connecting....")
        dispatch(connecting())
        socketRef.current = new WebSocket("ws://127.0.0.1:8080/signaling")
        socketRef.current.addEventListener('open', onOpen)
        socketRef.current.addEventListener('message', onMessage)
        socketRef.current.addEventListener('error', onError)
        return () => {
            socketRef.current.close()
            dispatch(reconnecting())
        }
    }, [])

    let onOpen = () => {
        dispatch(connected())
        socketRef.current.send("Hello")
        console.log("dddddddddddddddddddddddd")
        console.log(socketRef.current)
    }

    let onMessage = (event: any) => {
        console.log(event.data)
        setMessage(event.data)
    }
    let onError = (error: any) => {
        console.log(error)
        dispatch(reconnecting())
    }

    const sendMessage = (message: String) => {
        console.log(message)
        console.log(wsConnectionType)
        setTimeout(() => {
            socketRef.current.send(String(message))
        }, 1000)
    }

    // 詰まりポイント as const
    return [message, sendMessage] as const;
}

export default useWebSocket;