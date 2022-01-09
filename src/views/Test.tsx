import React, {useRef} from "react";
import {HelmetProvider} from "react-helmet-async";
import Helm from "../components/Helmet";
import HeaderBar from "../components/HeaderBar";
import {Box, Button, Container, Paper} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import OpenStreetMaps from "../components/OpenStreetMaps";
import OperationPanel from "../components/OperationPanel";
import useWebSocket from "../hooks/useWebSocket";
import {WSMessages} from "../handler/wsMessages";
import RTConnection from "../handler/RTConnection";
import useConnection from "../hooks/useConnection";
import useUserMedia from "../hooks/useUserMedia";
import useRandomWayPoint from "../hooks/useRandomWayPoint";

const Test = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)

    const localMessageRef = useRef<HTMLTextAreaElement>(null)
    const remoteMessageRef = useRef<HTMLTextAreaElement>(null)

    const logDataRef = useRef<{}[]>([])

    const downloadLinkRef = useRef<HTMLAnchorElement>(null)

    // NOTE: 実際の現在地を使う
    // useGeoLocationStatus()
    // NOTE: ダミーデータを使う
    useRandomWayPoint(logDataRef)

    const stream = useUserMedia(localVideoRef)
    const [message, sendMessage] = useWebSocket(logDataRef)
    const wsMessage = new WSMessages(sendMessage)
    // NOTE: WebRTC関連処理
    const [setICECandidate, setOffer, setAnswer, connect, disconnect, sendDataChanelMessage] = RTConnection(stream, localVideoRef, remoteVideoRef, wsMessage, localMessageRef, remoteMessageRef)
    useConnection(message, wsMessage, setICECandidate, setOffer, setAnswer, disconnect, logDataRef)

    const downloadLog = () => {
        const data = new Blob([JSON.stringify(logDataRef.current)], {type: 'text/plain'})
        downloadLinkRef.current!.href = window.URL.createObjectURL(data)
        const nowTime = new Date()
        console.log(nowTime.getFullYear())
        console.log(nowTime.getMonth() + 1)
        downloadLinkRef.current!.setAttribute('download', nowTime.getFullYear() + ('00' + (nowTime.getMonth() + 1).toString()).slice(-2) + ('00' + nowTime.getDate()).slice(-2) + '-' + ('00' + nowTime.getHours()).slice(-2) + ('00' + nowTime.getMinutes()).slice(-2) + ('00' + nowTime.getSeconds()).slice(-2) + '.log')
    }

    const fileChange = (event: any) => {
        const fileList = event.target.files;
        console.log(fileList);
    }


    return (
        <>
            <div style={{textAlign: "center"}}>
                <HelmetProvider>
                    <Helm/>
                    <HeaderBar/>
                    <Container component="main" sx={{pb: 10, display: 'flex'}}>
                        <CssBaseline/>
                        <Box sx={{mt: 5, float: 'left'}}>
                            <Paper elevation={8} sx={{float: 'left'}}>
                                <Box
                                    sx={{
                                        mx: 50,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                </Box>
                                <OpenStreetMaps/>
                            </Paper>
                        </Box>
                        <Box sx={{mt: 5, float: 'left'}}>
                            <Paper elevation={8} sx={{mx: 10, float: 'left'}}>
                                <Box
                                    sx={{
                                        my: 10,
                                        py: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <OperationPanel/>
                                </Box>
                                <input type="file" id="file-selector" multiple onChange={fileChange}/>
                                <Button onClick={downloadLog}>
                                    <a ref={downloadLinkRef}>DownloadLog</a>
                                </Button>
                            </Paper>
                        </Box>
                    </Container>
                </HelmetProvider>
            </div>
        </>
    )
}

export default Test;