import React, {useRef} from "react";
import Video from "../components/Video";
import {TextField, Paper, Container, Box} from "@mui/material";

const VideoChat = () => {
    /*
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)

    const localMessageRef = useRef<HTMLDivElement>(null)
    const remoteMessageRef = useRef<HTMLDivElement>(null)
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
            <Container fixed>
                <Box sx={{bgcolor: '#ffffff', height: '100vh'}}>
                    <Video localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef}/>
                    <TextField inputProps={{readOnly: true}} multiline rows={10} ref={remoteMessageRef}/>
                    <TextField ref={localMessageRef}/>
                    <button onClick={startVideo}>Start Video</button>
                    <Paper elevation={3}/>
                </Box>
            </Container>
        </>
    )
     */
    // XXX: App側のVideoと競合しちゃうのでコメントアウト
    return (
        <>
        </>
    )
}
export default VideoChat
