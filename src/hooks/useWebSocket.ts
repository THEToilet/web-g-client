import React, {useEffect, useRef, useState} from "react";

const useWebSocket = (csvDataRef: React.MutableRefObject<{ time: string; value: string; key: string }[]>) => {

    const [message, setMessage] = useState<string>("")
    const socketRef = useRef<WebSocket>(null!)

    const connectionIntervalRef = useRef<NodeJS.Timeout>()
    const waitForIntervalRef = useRef<NodeJS.Timeout>()

    let timeout: number = 100

    useEffect(() => {
            return () => {
                clearTimeout(waitForIntervalRef.current!)
                clearTimeout(connectionIntervalRef.current!)
            }
        }, []
    )

    const onOpen = () => {
        clearTimeout(connectionIntervalRef.current!)
    }

    const onMessage = (event: any) => {
        setMessage(event.data)
        csvDataRef.current.push({'time': new Date().toLocaleString('ja-JP-u-ca-japanese'), value: event.data , key: 'onMessage'})
        csvDataRef.current.push({'time': new Date().toLocaleString('ja-JP-u-ca-japanese'), value: event.data.length, key: 'onMessage length'})
        csvDataRef.current.push({
            'time': new Date().toLocaleString('ja-JP-u-ca-japanese'),
            value: encodeURIComponent(event.data.toString()).replace(/%../g, "x").length.toString(),
            key: 'onMessage bytes'
        })
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
        connectionIntervalRef.current = setTimeout(check, Math.min(10000, timeout));
    }

    const check = () => {
        if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
            connect()
        }
    }

    const connect = () => {
        console.log("connecting....")
        socketRef.current = new WebSocket(String(process.env.REACT_APP_SERVER))
        socketRef.current.addEventListener('open', onOpen)
        socketRef.current.addEventListener('message', onMessage)
        socketRef.current.addEventListener('error', onError)
        socketRef.current.addEventListener('close', onClose)
    }

    useEffect(() => {
        connect()
        // NOTE: 依存配列にconnectを入れるとレンダーするたびにsocketが作られるので注意
    }, [])

    // REFERENCE: https://stackoverflow.com/questions/23051416/uncaught-invalidstateerror-failed-to-execute-send-on-websocket-still-in-co
    const sendMessage = async (message: String) => {
        waitForConnection(() => {
            try {
                socketRef.current.send(String(message))
                csvDataRef.current.push({
                    'time': new Date().toLocaleString('ja-JP-u-ca-japanese'),
                    value: String(message),
                    key: 'sendMessage' + message
                })
                csvDataRef.current.push({
                    'time': new Date().toLocaleString('ja-JP-u-ca-japanese'),
                    value: String(message.length),
                    key: 'sendMessage length'
                })
                csvDataRef.current.push({
                    'time': new Date().toLocaleString('ja-JP-u-ca-japanese'),
                    value: encodeURIComponent(message.toString()).replace(/%../g, "x").length.toString(),
                    key: 'sendMessage bytes'
                })
            } catch (e) {
                console.error(e)
            }
        }, 500)
    }

    // TODO: clearTimeoutは必要か調べる
    // NOTE: WebSocketのコネクションが確立するまで待つ
    const waitForConnection = (callback: any, interval: number) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            callback()
        } else {
            waitForIntervalRef.current! = setTimeout(() => {
                waitForConnection(callback, interval)
            }, interval)
        }
    }

    // NOTE: TypeScriptでは as const　をつける
    return [message, sendMessage] as const;
}

export default useWebSocket;
