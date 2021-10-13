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
    }

    let onMessage = (event: any) => {
        //console.log(event.data)
        setMessage(event.data)
        // ここは直にhandleMessageに入れる
    }
    let onError = (error: any) => {
        console.log(error)
        dispatch(reconnecting())
    }

    // https://stackoverflow.com/questions/23051416/uncaught-invalidstateerror-failed-to-execute-send-on-websocket-still-in-co
    const sendMessage = async (message: String) => {
        console.log(message)
        waitForConnection(() => {
            socketRef.current.send(String(message))
        }, 1000)
    }


    // TODO clearTimeoutは必要か調べる
    const waitForConnection = (callback: any, interval: number) => {
        // WebSocketが接続するまで待つ
        if (socketRef.current.readyState === 1) {
            callback()
        } else {
            setTimeout(() => {
                waitForConnection(callback, interval)
            }, interval)
        }
    }

    // 詰まりポイント as const
    return [message, sendMessage] as const;
}

export default useWebSocket;