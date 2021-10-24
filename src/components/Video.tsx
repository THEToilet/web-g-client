import React, {useState} from "react";

const Video = (props: any) => {
    const [isPlay, setIsPlay] = useState<Boolean>(false);

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

    return (
        <>
            <video ref={props.localVideoRef} autoPlay={true}
                   style={{width: '320px', height: '240px', border: '1px solid black'}}/>
            <video ref={props.remoteVideoRef} autoPlay={true}
                   style={{width: '320px', height: '240px', border: '1px solid black'}}/>
            <button onClick={pauseVideo}></button>
        </>
    )
}
export default Video
