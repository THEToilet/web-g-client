import {useEffect, useRef, useState} from "react";
import * as dgram from "dgram";

const useUDPConnection = () => {

    const [udpMessage, setMessageUDP] = useState<string>("")
    const socketRef = useRef<dgram.Socket>(null!)

    useEffect(() => {
        console.log("connecting....")
        socketRef.current = dgram.createSocket("udp4")
        socketRef.current.on('message', onMessage)
        socketRef.current.on('error', onError)
        return () => {
            socketRef.current.close()
        }
    }, [socketRef])

    let onMessage = (event: any) => {
        console.log(event.data)
        setMessageUDP(event.data)
    }
    let onError = (error: any) => {
        console.log(error)
        socketRef.current.close()
    }

    const sendUDPMessage = (message: string, host: string, port: number) => {
        console.log(message)
        socketRef.current.send(message, port , host, function (err, bytes){
            console.log(bytes)
            socketRef.current.close()
        })
    }

    // 詰まりポイント as const
    return [udpMessage, sendUDPMessage] as const;
}
export default useUDPConnection;