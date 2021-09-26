import {useEffect, useRef, useState} from "react";

const useWebSocket = () => {

    const [message, setMessage] = useState<string>("")
    const socketRef = useRef<WebSocket>(null!)

    useEffect(() => {
        console.log("connecting....")
        socketRef.current = new WebSocket("ws://127.0.0.1:8080/signaling")
        socketRef.current.addEventListener('open', onOpen)
        socketRef.current.addEventListener('message', onMessage)
        socketRef.current.addEventListener('error', onError)
        return () => {
            socketRef.current.close()
        }
    }, [])

    let onOpen = () => {
        socketRef.current.send("Hello")
        socketRef.current.send(JSON.stringify({
            type: 'send',
            message: 'unko'
        }))
    }
    let onMessage = (event: any) => {
        console.log(event.data)
        setMessage(event.data)
    }
    let onError = (error: any) => {
        console.log(error)
    }

    const sendMessage = (message : String) => {
        console.log(message)
        setInterval(() => socketRef.current.send(String(message)), 1000);
    }

    // 詰まりポイント as const
    return [message, sendMessage] as const;
}

export default useWebSocket;