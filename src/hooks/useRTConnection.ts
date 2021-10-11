// https://html5experts.jp/mganeko/19814/
// https://qiita.com/yusuke84/items/43a20e3b6c78ae9a8f6c
// https://www.w3.org/TR/webrtc/#simple-peer-to-peer-example

// TODO: Reduxを使うかな？

//const localStream: boolean = false

const useRTConnection = (remoteVideoRef: React.RefObject<HTMLVideoElement>) => {
    const pc_config = {"iceServers": []}
    const peer = new RTCPeerConnection(pc_config)

    // リモートのMediaStreamTrackの受信
    peer.ontrack = ({track, streams}) => {
        track.onunmute = () => {
            if (remoteVideoRef.current!.srcObject) return;
            remoteVideoRef.current!.srcObject = streams[0]
        }
    }

    // Vanilla ICE
    peer.onicecandidate = ({candidate}) => {
        // Candidate受信
        if (candidate) {
            console.log(candidate)
            // Trickle ICEはここで送信
        } else {
            // 空のICE Candidateは収集終了の知らせ
            // SDP送信
            const message = JSON.stringify({type:'candidate', ice: candidate})
            // sendMessage
        }
    }

    peer.onnegotiationneeded = async () => {
        try {
            const offer = await peer.createOffer()
            await peer.setLocalDescription(offer)
            // send SDP
        } catch (error) {
            console.log(error)
        }
    }

    // Trickle ICE
    /*
     peer.onicecandidate = evt => {
        if (evt.candidate) {
            console.log(evt.candidate);
            sendIceCandidate(evt.candidate);
        } else {
            console.log('empty ice event');
        }
    };
     */

    /*
    // 通信先の映像音声ストリームをローカルに追加
    if (localStream) {
        peer.addStream(localStream)
    } else {
        console.log("error")
    }
     */

    /*
    // add camera and microphone to connection
    async function addCameraMic() {
        try {
    // get a local stream, show it in a self-view and add it to be sent
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            for (const track of stream.getTracks()) {
                pc.addTrack(track, stream);
             }
            selfView.srcObject = stream;
         } catch (err) {
            console.error(err);
         }
      }
     */
    // 相手からのOfferをsetする自分はAnswer側
    const setOffer = () =>  {

    }
    // 相手からのAnswerをsetする自分はOffer側
    const setAnswer = () => {

    }


    const hangUp = () => {

    }
}

export default useRTConnection