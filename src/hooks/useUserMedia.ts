import React, {useEffect, useState} from "react";

const useUserMedia = (videoRef : React.RefObject<HTMLVideoElement>) => {
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(
            (stream) => {
                videoRef.current!.srcObject = stream
            }
        ).catch((error) => {
                console.log(error)
            }
        )
    }, [])
}

export default useUserMedia