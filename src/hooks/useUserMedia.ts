import React, {useEffect, useRef} from "react";

const useUserMedia = (videoRef: React.RefObject<HTMLVideoElement>) => {
    const localStream = useRef<MediaStream>()
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(
            (stream) => {
                videoRef.current!.srcObject = stream
                localStream.current = stream
            }
        ).catch((error) => {
                console.log(error)
            }
        )
    }, [])

    return localStream
}

export default useUserMedia