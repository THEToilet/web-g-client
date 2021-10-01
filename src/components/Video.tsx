import {useRef} from "react";
import useUserMedia from "../hooks/useUserMedia";

const Video = () => {
    const videoRef =  useRef<HTMLVideoElement>(null)
    useUserMedia(videoRef)
    return (
        <>
            <video ref={videoRef} autoPlay={true} style={{width: '320px',height: '240px', border: '1px solid black'}}/>
        </>
    )

}
export default Video