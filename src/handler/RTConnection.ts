// REFERENCE: https://html5experts.jp/mganeko/19814/
// REFERENCE: https://qiita.com/yusuke84/items/43a20e3b6c78ae9a8f6c
// REFERENCE: https://www.w3.org/TR/webrtc/#simple-peer-to-peer-example

import React, {useRef} from "react";
import {WSMessages} from "./wsMessages";
import {useDispatch, useSelector} from "react-redux";
import {getGSetting, getGSignalingStatus, getP2PStatus} from "../store/selector";
import {setConnected, setConnectedUser} from '../store/slices/gSignalingStatus'
import timeFormatter from "../shared/utils/timeFormatter";

const RTConnection = (localStream: React.MutableRefObject<MediaStream | undefined>, localVideoRef: React.RefObject<HTMLVideoElement>, remoteVideoRef: React.RefObject<HTMLVideoElement>, wsMessage: WSMessages, localMessageRef: React.RefObject<HTMLTextAreaElement>, remoteMessageRef: React.RefObject<HTMLTextAreaElement>, logDataRef: React.MutableRefObject<{}[]>) => {
    const dispatch = useDispatch()

    const rtcPeerConnection = useRef<RTCPeerConnection>(null!)
    const rtcDataChannel = useRef<RTCDataChannel>(null!)
    const fileDataChannel = useRef<RTCDataChannel>(null!)

    const {destinationUserID} = useSelector(getP2PStatus)

    // NOTE: 64KB
    const MAX_CHUNK_SIZE = 65535
    //const MAX_CHUNK_SIZE = 16384

    const END_OF_FILE = 'EOF'

    // NOTE: 相手のMediaStreamTrackの受信
    const onTrack = async (e: any) => {
        console.log(new Date(), 'ontrack', e)
        console.log(remoteVideoRef)
        remoteVideoRef.current!.srcObject = e.streams[0]
        await remoteVideoRef.current?.play()
    }

    // NOTE: Vanilla ICE
    const onIcecandidate = (candidate: any) => {
        console.log(new Date(), 'candidate')
        if (candidate && candidate.candidate) {
            console.log(candidate)
            //wsMessage.sendCandidate(rtcPeerConnection.current.localDescription!.sdp)
            wsMessage.sendCandidate(candidate.candidate)
            console.log(new Date(), candidate.candidate)
            // Trickle ICEはここで送信
        } else {
            // NOTE: 空のICE Candidateは収集終了の知らせ
            // Vanilla ICE
            //wsMessage.sendCandidate(rtcPeerConnection.current.localDescription!.sdp, destinationUserID)
        }
    }

    const onNegotiationneeded = async () => {
        console.log("negotiationneeded")
        try {
        } catch (error) {
            console.log(error)
        }
    }

    const onIceConnectionstatechange = () => {
        console.log(new Date(), 'ice status has changed', rtcPeerConnection.current.iceConnectionState)
    }

    const onDataChannel = (evt: any) => {
        evt.channel.addEventListener('open', onOpen)
        evt.channel.addEventListener('message', onMessage)
        evt.channel.addEventListener('close', onClose)
        evt.channel.addEventListener('error', onError)
        rtcDataChannel.current = evt.channel
        // NOTE: ChromeとFireFoxに対応させる
        rtcDataChannel.current.binaryType = 'arraybuffer'
    }

    // NOTE: --------dataChannel--------------------
    const onOpen = () => {
    }

    const receivedBuffers: any = []

    const onMessage = (e: any) => {
        console.log(e.data)
        try {
            if (e.data !== END_OF_FILE) {
                receivedBuffers.push(e.data)
                logDataRef.current.push({
                    time: timeFormatter(new Date()),
                    message: 'DATA-CHANNEL-DATA-RECEIVE',
                    fileName: rtcDataChannel.current.label
                })
            } else {
                const arrayBuffer = receivedBuffers.reduce((acc: any, arrayBuffer: any) => {
                    const tmp = new Uint8Array(acc.byteLength + arrayBuffer.byteLength)
                    tmp.set(new Uint8Array(acc), 0)
                    tmp.set(new Uint8Array(arrayBuffer), acc.byteLength)
                    return tmp;
                }, new Uint8Array())
                const blob = new Blob([arrayBuffer])
                logDataRef.current.push({
                    time: timeFormatter(new Date()),
                    message: 'DATA-CHANNEL-EOF-RECEIVE',
                    fileName: rtcDataChannel.current.label
                })
                downloadFile(blob, rtcDataChannel.current.label)
                rtcDataChannel.current.close()
            }
        } catch (err) {
            console.log('File transfer failed')
        }
    }

    const onClose = () => {
    }


    const onError = (e: any) => {
        console.error(e)
    }

    const makeRTCPeerConnection = () => {
        // TODO: TURNを考える
        const pcConfig = {
            "iceServers": [
                {"urls": "stun:stun.l.google.com:19302"},
                {
                    "urls": "turn:v118-27-20-107.tkzi.static.cnode.io:5349",
                    "username": 'test',
                    "credential": "pass"
                },
                {
                    "urls": "turn:v118-27-20-107.tkzi.static.cnode.io:3478",
                    "username": 'test',
                    "credential": "pass"
                }
            ]
        }
        rtcPeerConnection.current = new RTCPeerConnection(pcConfig)
        console.log(new Date(), 'make')
        rtcPeerConnection.current.addEventListener('track', onTrack)
        rtcPeerConnection.current.addEventListener('icecandidate', onIcecandidate)
        rtcPeerConnection.current.addEventListener('negotiationneeded', onNegotiationneeded)
        rtcPeerConnection.current.addEventListener('iceconnectionstatechange', onIceConnectionstatechange)
        rtcPeerConnection.current.addEventListener('datachannel', onDataChannel)
        // XXX: データチャネルだけつかいたいのでコメントアウトする
        /*
        localStream.current!.getTracks().forEach(
            track => rtcPeerConnection.current.addTrack(track, localStream.current!)
        )
         */

        // NOTE: DataChannel
        // TODO: datachannelOptionについて調べる
        rtcDataChannel.current = rtcPeerConnection.current.createDataChannel('message-data-channel')
        rtcDataChannel.current.addEventListener('open', onOpen)
        rtcDataChannel.current.addEventListener('message', onMessage)
        rtcDataChannel.current.addEventListener('close', onClose)
        rtcDataChannel.current.addEventListener('error', onError)
    }

    const setICECandidate = (iceCandidate: RTCIceCandidate) => {
        console.log(new Date(), 'add ICE candidate')
        rtcPeerConnection.current.addIceCandidate(iceCandidate).catch(
            e => {
                console.log(e)
            }
        )
    }

    // NOTE: 相手からのOffer要請を登録する自分はAnswer側
    const setOffer = async (sdp: string, destination: string) => {
        makeRTCPeerConnection()
        await rtcPeerConnection.current.setRemoteDescription({type: 'offer', sdp: sdp}).catch(
            e => {
                console.log(e)
            }
        )
        await makeAnswer(destination)
        dispatch(setConnected(true))
        dispatch(setConnectedUser(destination))
    }

    const makeAnswer = async (destination: string) => {
        const answer = await rtcPeerConnection.current.createAnswer()
        await rtcPeerConnection.current.setLocalDescription(answer)
        // NOTE: undefined許容型
        console.log(new Date(), '-----sendAnswer--------', answer.type)
        wsMessage.sendAnswer(answer.sdp!, destination)
    }

    // NOTE: 相手からのAnswer要請を登録する自分はOffer側
    const setAnswer = async (sdp: string) => {
        await rtcPeerConnection.current.setRemoteDescription({type: 'answer', sdp: sdp})
    }

    const connect = async (userID: string) => {
        makeRTCPeerConnection()
        const sdp = await rtcPeerConnection.current.createOffer()
        console.log(new Date(), 'sdp', sdp)
        await rtcPeerConnection.current.setLocalDescription(sdp)
        // NOTE: Send SDP
        wsMessage.sendOffer(sdp.sdp!, userID)
        console.log(new Date(), '-----------------------------------connect-----------------')
        dispatch(setConnectedUser(userID))
        // XXX: ここに置くのは望ましくない
        dispatch(setConnected(true))
    }

    const disconnect = () => {
        rtcPeerConnection.current.close()
        wsMessage.sendClose(destinationUserID)
    }

    const sendDateChanelMessage = () => {
        if (!rtcPeerConnection.current || rtcPeerConnection.current.connectionState !== 'connected') {
            console.error('rtcPeerConnection is null')
            return
        }
        const message = localMessageRef.current!.value;
        localMessageRef.current!.value = ''

        remoteMessageRef.current!.value = ' > ' + message + '\n' + remoteMessageRef.current!.value
        rtcDataChannel.current.send(message)
    }

    const sendDateChanelFIle = async (file: Blob) => {
        if (!rtcPeerConnection.current || rtcPeerConnection.current.connectionState !== 'connected') {
            console.error('rtcPeerConnection is null')
            return
        }
        rtcDataChannel.current.send(await file.text())
    }

    // REFERENCE: https://ichi.pro/de-tachaneru-o-kaishite-fuxairu-o-soshinsuru-webrtc-o-shiyoshita-bideo-tsuwa-suteppu-6-232611614401361

    const shareFile = async (file: File) => {
        const channelLabel = file.name
        fileDataChannel.current = rtcPeerConnection.current.createDataChannel(channelLabel)
        // NOTE: FireFoxとChromeのどっちにも対応させるため
        fileDataChannel.current.binaryType = 'arraybuffer'

        logDataRef.current.push({
            time: timeFormatter(new Date()),
            message: 'FILE-SEND-START'
        })

        fileDataChannel.current.onopen = async () => {
            const arrayBuffer = await file.arrayBuffer()
            for (let i = 0; i < arrayBuffer.byteLength; i += MAX_CHUNK_SIZE) {
                console.log(i)
                fileDataChannel.current.send(arrayBuffer.slice(i, i + MAX_CHUNK_SIZE))
            }
            fileDataChannel.current.send(END_OF_FILE)
            logDataRef.current.push({
                time: timeFormatter(new Date()),
                message: 'FILE-SEND-END',
                fileName: fileDataChannel.current.label
            })
        }

        fileDataChannel.current.onclose = () => {
        }

        fileDataChannel.current.onerror = (e: any) => {
            logDataRef.current.push({
                time: timeFormatter(new Date()),
                message: 'FILE-DATA-CHANNEL-ERROR',
                error: e,
                fileName: fileDataChannel.current.label
            })
            console.error(e)
        }
    }

    const downloadFile = (file: Blob, fileName: string) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(file);
        link.href = url
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(url)
        link.remove()
        logDataRef.current.push({
            time: timeFormatter(new Date()),
            message: 'FILE-DOWNLOAD',
            fileName: fileName
        })
    }

    return [setICECandidate, setOffer, setAnswer, connect, disconnect, sendDateChanelMessage, sendDateChanelFIle, shareFile] as const
}

export default RTConnection