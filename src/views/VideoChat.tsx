import React, {useRef} from "react";
import Video from "../components/Video";
import useUserMedia from "../hooks/useUserMedia";

const VideoChat = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)

    const localMessageRef = useRef<HTMLTextAreaElement>(null)
    const remoteMessageRef = useRef<HTMLTextAreaElement>(null)
    const localStream = useRef<MediaStream>()

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(
            (stream) => {
                localVideoRef.current!.srcObject = stream
                localStream.current = stream
            }
        ).catch((error) => {
                console.log(error)
            }
        )
    }

    return (
        <>
            <h2>Hello!!!!!!!!!</h2>
            <Video localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef}/>
            <textarea readOnly={true} ref={remoteMessageRef}/>
            <textarea ref={localMessageRef}/>
            <button onClick={startVideo}>Start Video</button>
        </>
    )
}
export default VideoChat
