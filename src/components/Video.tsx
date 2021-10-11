import {useRef, useState} from "react";
import useUserMedia from "../hooks/useUserMedia";

const Video = () => {
    const [isPlay, setIsPlay] = useState<Boolean>(false);
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)

    // playとsetを分ける
    const playVideo = async (element: any, stream: any) => {
        element.srcObject = stream
        try {
            await element.play()
        } catch (error) {
            console.log(error)
        }
    }

    const pauseVideo = (element: any) => {
        element.pause()
    }

    useUserMedia(localVideoRef)
    return (
        <>
            <video ref={localVideoRef} autoPlay={true} style={{width: '320px', height: '240px', border: '1px solid black'}}/>
            <video ref={remoteVideoRef} autoPlay={true} style={{width: '320px', height: '240px', border: '1px solid black'}}/>
        </>
    )
}
export default Video
