// https://html5experts.jp/mganeko/19814/
// https://qiita.com/yusuke84/items/43a20e3b6c78ae9a8f6c

// TODO: Reduxを使うかな？

//const localStream: boolean = false

const useRTPConnection = () => {
    const pc_config = {"iceServers": []}
    const peer = new RTCPeerConnection(pc_config)

    // リモートのMediaStreamTrackの受信
    peer.ontrack = ev => {
        // playVideoをつかう
        // remoteVideoはビデオタグ
        // playVideo(remoteVideo, evt.streams[0])
    }

    // Vanilla ICE
    peer.onicecandidate = ev => {
        // Candidate受信
        if (ev.candidate) {
            console.log(ev.candidate)
        } else {
            // 空のICE Candidateは収集終了の知らせ
            // SDP送信
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

}

export default useRTPConnection