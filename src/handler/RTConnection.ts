// REFERENCE: https://html5experts.jp/mganeko/19814/
// REFERENCE: https://qiita.com/yusuke84/items/43a20e3b6c78ae9a8f6c
// REFERENCE: https://www.w3.org/TR/webrtc/#simple-peer-to-peer-example

import React, {useRef} from "react";
import {WSMessages} from "./wsMessages";
import {useSelector} from "react-redux";
import {getP2PStatus} from "../store/selector";

const RTConnection = (localStream: React.MutableRefObject<MediaStream | undefined>, localVideoRef: React.RefObject<HTMLVideoElement>, remoteVideoRef: React.RefObject<HTMLVideoElement>, wsMessage: WSMessages, localMessageRef: React.RefObject<HTMLTextAreaElement>, remoteMessageRef: React.RefObject<HTMLTextAreaElement>) => {
    const rtcPeerConnection = useRef<RTCPeerConnection>(null!)
    const rtcDataChannel = useRef<RTCDataChannel>(null!)

    const {destinationUserID} = useSelector(getP2PStatus)

    // NOTE: 相手のMediaStreamTrackの受信
    const onTrack = async (e: any) => {
        console.log(new Date(), 'ontrack-------------------------------------------------------------------------------------', e)
        console.log(remoteVideoRef)
        remoteVideoRef.current!.srcObject = e.streams[0]
        await remoteVideoRef.current?.play()
    }

    // NOTE: Vanilla ICE
    const onIcecandidate = (candidate: any) => {
        console.log(new Date(), 'candidate', 'woooooooooooooooooooooo')
        if (candidate && candidate.candidate) {
            console.log(candidate)
            //wsMessage.sendCandidate(rtcPeerConnection.current.localDescription!.sdp)
            wsMessage.sendCandidate(candidate.candidate)
            console.log(new Date(), 'hello-----------', candidate.candidate)
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

    const onDataChannel = (evt : any) => {
        evt.channel.addEventListener('open', onOpen)
        evt.channel.addEventListener('message', onMessage)
        evt.channel.addEventListener('close', onClose)
        evt.channel.addEventListener('error', onError)
        rtcDataChannel.current = evt.channel
    }

    // NOTE: --------dataChannel--------------------
    const onOpen = () => {
    }

    const onMessage = (e: any) => {
        remoteMessageRef.current!.value = ' < ' + e.data + '\n' + remoteMessageRef.current!.value
    }

    const onClose = () => {
    }


    const onError = (e: any) => {
        console.error(e)
    }

    const makeRTCPeerConnection = () => {
        // TODO: TURNを考える
        const pcConfig = {"iceServers": [{"urls": "stun:stun.l.google.com:19302"}]}
        rtcPeerConnection.current = new RTCPeerConnection(pcConfig)
        console.log(new Date(), 'make')
        rtcPeerConnection.current.addEventListener('track', onTrack)
        rtcPeerConnection.current.addEventListener('icecandidate', onIcecandidate)
        rtcPeerConnection.current.addEventListener('negotiationneeded', onNegotiationneeded)
        rtcPeerConnection.current.addEventListener('iceconnectionstatechange', onIceConnectionstatechange)
        rtcPeerConnection.current.addEventListener('datachannel', onDataChannel)
        localStream.current!.getTracks().forEach(
            track => rtcPeerConnection.current.addTrack(track, localStream.current!)
        )
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

    return [setICECandidate, setOffer, setAnswer, connect, disconnect, sendDateChanelMessage] as const
}

export default RTConnection