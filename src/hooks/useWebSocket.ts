import {useEffect, useRef, useState} from "react";

const useWebSocket = () => {

    const [message, setMessage] = useState<string>("")
    const socketRef = useRef<WebSocket>(null!)

    let connectInterval: NodeJS.Timeout
    let timeout: number = 100

    const onOpen = () => {
        clearTimeout(connectInterval)
    }

    const onMessage = (event: any) => {
        setMessage(event.data)
    }

    const onError = (error: any) => {
        console.error("WebSocket error: ", error)
        socketRef.current.close()
    }

    // NOTE: 指数関数的バックオフらしい
    // REFERENCE: https://dev.to/finallynero/using-websockets-in-react-4fkp
    const onClose = (e: any) => {
        console.log(
            'WebSocket is closed :',
            e
        );
        // NOTE: 呼び出されるたびにタイムアウト時間を増やす
        // TODO: ここは指数関数的に増やす
        timeout = timeout + timeout;
        // NOTE: 再接続処理
        connectInterval = setTimeout(check, Math.min(10000, timeout));
    }

    const check = () => {
        if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
            connect()
        }
    }

    const connect = () => {
        console.log("connecting....")
        socketRef.current = new WebSocket("ws://127.0.0.1:8080/signaling")
        socketRef.current.addEventListener('open', onOpen)
        socketRef.current.addEventListener('message', onMessage)
        socketRef.current.addEventListener('error', onError)
        socketRef.current.addEventListener('close', onClose)
    }

    useEffect(() => {
        connect()
        // NOTE: 依存配列にconnectを入れるとレンダーするたびにscoketが作られるので注意
    }, [])

    // REFERENCE: https://stackoverflow.com/questions/23051416/uncaught-invalidstateerror-failed-to-execute-send-on-websocket-still-in-co
    const sendMessage = async (message: String) => {
        waitForConnection(() => {
            try {
                socketRef.current.send(String(message))
                console.log(new Date(), 'message : ', message)
            } catch (e) {
                console.error(e)
            }
        }, 100)
    }

    // TODO clearTimeoutは必要か調べる
    // NOTE: WebSocketのコネクションが確立するまで待つ
    const waitForConnection = (callback: any, interval: number) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            callback()
        } else {
            setTimeout(() => {
                waitForConnection(callback, interval)
            }, interval)
        }
    }

    // NOTE: TypeScriptでは as const　をつける
    return [message, sendMessage] as const;
}

export default useWebSocket;