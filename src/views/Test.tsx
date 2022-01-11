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
import timeFormatter from "../shared/utils/timeFormatter";

const Test = () => {
    // NOTE: ビデオオブジェクト
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)

    // NOTE: チャットオブジェクト
    const localMessageRef = useRef<HTMLTextAreaElement>(null)
    const remoteMessageRef = useRef<HTMLTextAreaElement>(null)

    // NOTE: ログデータ保存場所
    const logDataRef = useRef<{}[]>([])

    const logDownloadLinkRef = useRef<HTMLAnchorElement>(null)

    const fileDataRef = useRef<File>()

    // NOTE: 実際の現在地を使う
    // useGeoLocationStatus()
    // NOTE: ダミーデータを使う
    useRandomWayPoint(logDataRef)

    // NOTE: 移動
    const stream = useUserMedia(localVideoRef)

    // NOTE: 上位に移動
    const [message, sendMessage] = useWebSocket(logDataRef)
    const wsMessage = new WSMessages(sendMessage)
    // NOTE: WebRTC関連処理
    const [setICECandidate, setOffer, setAnswer, connect, disconnect, sendDataChanelMessage, sendDataChanelFile, shareFIle] = RTConnection(stream, localVideoRef, remoteVideoRef, wsMessage, localMessageRef, remoteMessageRef)
    useConnection(message, wsMessage, setICECandidate, setOffer, setAnswer, disconnect, logDataRef)

    const downloadLog = () => {
        const data = new Blob([JSON.stringify(logDataRef.current)], {type: 'text/plain'})
        logDownloadLinkRef.current!.href = window.URL.createObjectURL(data)
        const filename = timeFormatter(new Date()) + '.log'
        logDownloadLinkRef.current!.setAttribute('download', filename)
    }

    const fileChange = (event: any) => {
        const fileList = event.target.files;
        console.log(fileList);
        console.log(typeof fileList);
        console.log(fileList[0])
        fileDataRef.current = fileList[0]
    }

    const sendFile = () => {
        if (fileDataRef.current) {
            shareFIle(fileDataRef.current)
        }
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
                                <OpenStreetMaps props={connect}/>
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
                                    <OperationPanel props={connect}/>
                                </Box>
                                <input type="file" id="file-selector" multiple onChange={fileChange}/>
                                <Button onClick={downloadLog}>
                                    <a ref={logDownloadLinkRef}>DownloadLog</a>
                                </Button>
                                <Button onClick={sendFile}>
                                    SEND FILE
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