// REFERENCE: https://html5experts.jp/mganeko/19814/
// REFERENCE: https://qiita.com/yusuke84/items/43a20e3b6c78ae9a8f6c
// REFERENCE: https://www.w3.org/TR/webrtc/#simple-peer-to-peer-example

import React, {useRef} from "react";
import {WSMessages} from "./wsMessages";
import {useSelector} from "react-redux";
import {getP2PStatus} from "../store/selector";

const RTConnection = (remoteVideoRef: React.RefObject<HTMLVideoElement>, wsMessage: WSMessages) => {
    const rtcPeerConnection = useRef<RTCPeerConnection>(null!)

    const {destinationUserID} = useSelector(getP2PStatus)

    const makeRTCPeerConnection = (isOffer: boolean) => {
        const pcConfig = {"iceServers": []}
        rtcPeerConnection.current = new RTCPeerConnection(pcConfig)

        console.log(new Date(), 'make')

        // NOTE: 相手のMediaStreamTrackの受信
        rtcPeerConnection.current.ontrack = ({track, streams}) => {
            track.onunmute = () => {
                if (remoteVideoRef.current!.srcObject) return;
                remoteVideoRef.current!.srcObject = streams[0]
            }
        }

        // NOTE: Vanilla ICE
        rtcPeerConnection.current.onicecandidate = ({candidate}) => {
            if (candidate) {
                console.log(candidate)
                // Trickle ICEはここで送信
            } else {
                // NOTE: 空のICE Candidateは収集終了の知らせ
                wsMessage.sendCandidate(String(candidate), destinationUserID)
            }
        }

        rtcPeerConnection.current.onnegotiationneeded = async () => {
            console.log("negotiationneeded")
            try {
                if (isOffer) {
                    const offer = await rtcPeerConnection.current.createOffer()
                    await rtcPeerConnection.current.setLocalDescription(offer)
                    // send SDP
                    console.log(new Date(), 'isOffer')
                    wsMessage.sendOffer("", "")
                }
            } catch (error) {
                console.log(error)
            }
        }

        rtcPeerConnection.current.oniceconnectionstatechange = () => {
            console.log(new Date(), rtcPeerConnection.current.iceConnectionState)
        }

    }

    const setICECandidate = (iceCandidate: RTCIceCandidate) => {
        rtcPeerConnection.current.addIceCandidate(iceCandidate).catch(
            e => {
                console.log(e)
            }
        )
    }

    // NOTE: 相手からのOffer要請を登録する自分はAnswer側
    const setOffer = async (sdp: string, destination : string) => {
        makeRTCPeerConnection(false)
        await rtcPeerConnection.current.setRemoteDescription({type: 'offer', sdp: sdp}).catch(
            e => {
                console.log(e)
            }
        )
        await sendAnswer(destination)
    }

    const sendAnswer = async (destination : string) => {
        const answer = await rtcPeerConnection.current.createAnswer()
        await rtcPeerConnection.current.setLocalDescription(answer)
        // NOTE: undefined許容型
        wsMessage.sendAnswer(answer.sdp!, destination)
    }

    // NOTE: 相手からのAnswer要請を登録する自分はOffer側
    const setAnswer = async (sdp: string) => {
        await rtcPeerConnection.current.setRemoteDescription({type: 'answer', sdp: sdp})
    }

    const connect = async (userID: string) => {
        makeRTCPeerConnection(true)
        const offer = await rtcPeerConnection.current.createOffer()
        await rtcPeerConnection.current.setLocalDescription(offer)
        // NOTE: Send SDP
        wsMessage.sendOffer(offer.sdp!, userID)
    }

    const disconnect = () => {
        rtcPeerConnection.current.close()
        wsMessage.sendClose(destinationUserID)
    }

    return [setICECandidate, setOffer, setAnswer, connect, disconnect] as const
}

export default RTConnection