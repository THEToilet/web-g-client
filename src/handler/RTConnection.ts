// REFERENCE: https://html5experts.jp/mganeko/19814/
// REFERENCE: https://qiita.com/yusuke84/items/43a20e3b6c78ae9a8f6c
// REFERENCE: https://www.w3.org/TR/webrtc/#simple-peer-to-peer-example

import React, {useEffect, useRef} from "react";
import {WSMessages} from "./wsMessages";
import {useSelector} from "react-redux";
import {getP2PStatus} from "../store/selector";

const RTConnection = (localStream: React.MutableRefObject<MediaStream | undefined>, localVideoRef: React.RefObject<HTMLVideoElement>, remoteVideoRef: React.RefObject<HTMLVideoElement>, wsMessage: WSMessages) => {
    const rtcPeerConnection = useRef<RTCPeerConnection>(null!)

    const {destinationUserID} = useSelector(getP2PStatus)

    // NOTE: 相手のMediaStreamTrackの受信
    //rtcPeerConnection.current.ontrack = ({track, streams}) => {
    //const onTrack = (track: any, streams: any) => {
    const onTrack = async (e: any) => {
        console.log(new Date(), 'ontrack-------------------------------------------------------------------------------------', e)
        /*
        e.onunmute().onunmute = async () => {
            if (remoteVideoRef.current!.srcObject) return;
            remoteVideoRef.current!.srcObject = e.streams[0]
            await remoteVideoRef.current!.play()
        }
         */
        remoteVideoRef.current!.srcObject = e.streams[0]
        await remoteVideoRef.current?.play()
    }

    // NOTE: Vanilla ICE
    //rtcPeerConnection.current.onicecandidate = ({candidate}) => {
    const onIcecandidate = (candidate: any) => {
        console.log(new Date(), 'candidate', 'woooooooooooooooooooooo')
        if (candidate) {
            console.log(candidate)
            wsMessage.sendCandidate(rtcPeerConnection.current.localDescription!.sdp)
            // Trickle ICEはここで送信
        } else {
            // NOTE: 空のICE Candidateは収集終了の知らせ
            //wsMessage.sendCandidate(candidate!.toJSON().candidate!, destinationUserID)
            //wsMessage.sendCandidate(rtcPeerConnection.current.localDescription!.sdp, destinationUserID)
        }
    }

    //rtcPeerConnection.current.onnegotiationneeded = async () => {
    const onNegotiationneeded = async () => {
        console.log("negotiationneeded")
        try {
        } catch (error) {
            console.log(error)
        }
    }

    //rtcPeerConnection.current.oniceconnectionstatechange = () => {
    const onIceConnectionstatechange = () => {
        console.log(new Date(), 'ice status has changed', rtcPeerConnection.current.iceConnectionState)
    }

    const makeRTCPeerConnection = () => {
        const pcConfig = {"iceServers": []}
        rtcPeerConnection.current = new RTCPeerConnection(pcConfig)
        console.log(new Date(), 'make')
        rtcPeerConnection.current.addEventListener('track', onTrack)
        rtcPeerConnection.current.addEventListener('icecandidate', onIcecandidate)
        rtcPeerConnection.current.addEventListener('negotiationneeded', onNegotiationneeded)
        rtcPeerConnection.current.addEventListener('iceconnectionstatechange', onIceConnectionstatechange)
        rtcPeerConnection.current.addTrack(
            localStream.current!.getVideoTracks()[0],
        )
    }

    const setICECandidate = (iceCandidate: RTCIceCandidate) => {
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

    return [setICECandidate, setOffer, setAnswer, connect, disconnect] as const
}

export default RTConnection