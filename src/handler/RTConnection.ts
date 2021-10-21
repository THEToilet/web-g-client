// REFERENCE: https://html5experts.jp/mganeko/19814/
// REFERENCE: https://qiita.com/yusuke84/items/43a20e3b6c78ae9a8f6c
// REFERENCE: https://www.w3.org/TR/webrtc/#simple-peer-to-peer-example

import React, {useRef} from "react";
import {WSMessages} from "./wsMessages";

const RTConnection = (remoteVideoRef: React.RefObject<HTMLVideoElement>, wsMessage: WSMessages) => {
    const rtcPeerConnection = useRef<RTCPeerConnection>(null!)

    const makeRTCPeerConnection = (isOffer: boolean) => {
        const pcConfig = {"iceServers": []}
        rtcPeerConnection.current = new RTCPeerConnection(pcConfig)

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
                wsMessage.sendCandidate(String(candidate))
            }
        }

        rtcPeerConnection.current.onnegotiationneeded = async () => {
            try {
                if (isOffer) {
                    const offer = await rtcPeerConnection.current.createOffer()
                    await rtcPeerConnection.current.setLocalDescription(offer)
                    // send SDP
                    wsMessage.sendOffer("")
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

    // 相手からのOffer要請を登録する自分はAnswer側
    const setOffer = async (sdp: RTCSessionDescription) => {
        makeRTCPeerConnection(false)
        await rtcPeerConnection.current.setRemoteDescription(sdp).catch(
            e => {
                console.log(e)
            }
        )
        await sendAnswer()
    }

    const sendAnswer = async () => {
        const answer = await rtcPeerConnection.current.createAnswer()
        await rtcPeerConnection.current.setLocalDescription(answer)
        wsMessage.sendAnswer(String(rtcPeerConnection.current.localDescription))
    }

    // MEMO: 相手からのAnswer要請を登録する自分はOffer側
    const setAnswer = async (sdp: RTCSessionDescription) => {
        await rtcPeerConnection.current.setRemoteDescription(sdp)
    }

    const connect = () => {
        makeRTCPeerConnection(true)
    }

    const disconnect = () => {
        rtcPeerConnection.current.close()
        wsMessage.sendClose()
    }

    return [setICECandidate, setOffer, setAnswer, connect, disconnect] as const
}

export default RTConnection