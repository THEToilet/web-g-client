import React, {useEffect, useRef} from "react";
import {HelmetProvider} from "react-helmet-async";
import Helm from "../components/Helmet";
import HeaderBar from "../components/HeaderBar";
import {Box, Button, Container, Paper} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import OpenStreetMaps from "../components/OpenStreetMaps";
import OperationPanel from "../components/OperationPanel";
import useGeoLocationStatus from "../hooks/useGeoLocation";
import useWebSocket from "../hooks/useWebSocket";
import {WSMessages} from "../handler/wsMessages";
import RTConnection from "../handler/RTConnection";
import useConnection from "../hooks/useConnection";
import useUserMedia from "../hooks/useUserMedia";
//import {CSVLink} from "react-csv";
import useRandomWayPoint from "../hooks/useRandomWayPoint";

const Test = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)

    const localMessageRef = useRef<HTMLTextAreaElement>(null)
    const remoteMessageRef = useRef<HTMLTextAreaElement>(null)

    /*
    useEffect(() => {
        // REFERENCE :https://stackoverflow.com/questions/19846078/how-to-read-from-chromes-console-in-javascript
        console.stdlog = console.log.bind(console)
        console.logs = []
        console.log = () => {
            console.logs.push
        }
    },[])
     */

    const csvDataRef = useRef<{ time: string; value: string; key: string }[]>([
        {"key": "csv", "value": "output", "time": "2021-11-12-12:00"}
    ])

    const downloadLinkRef = useRef<HTMLAnchorElement>(null)

    // NOTE: 実際の現在地を使うか、
    //useGeoLocationStatus()
    useRandomWayPoint(csvDataRef)

    const stream = useUserMedia(localVideoRef)
    const [message, sendMessage] = useWebSocket(csvDataRef)
    const wsMessage = new WSMessages(sendMessage)
    // NOTE: WebRTC関連処理
    const [setICECandidate, setOffer, setAnswer, connect, disconnect, sendDataChanelMessage] = RTConnection(stream, localVideoRef, remoteVideoRef, wsMessage, localMessageRef, remoteMessageRef)
    useConnection(message, wsMessage, setICECandidate, setOffer, setAnswer, disconnect, csvDataRef)

    const downloadLog = () => {
        const data = new Blob([JSON.stringify(csvDataRef.current)], {type: 'text/plain'})
        downloadLinkRef.current!.href = window.URL.createObjectURL(data)
        const nowTime = new Date()
        console.log(nowTime.getFullYear())
        console.log(nowTime.getMonth() + 1)
        downloadLinkRef.current!.setAttribute('download', nowTime.getFullYear() + (nowTime.getMonth() + 1).toString() + nowTime.getDate() + '-' + nowTime.getHours() + nowTime.getMinutes() + '.log')
        //downloadLinkRef.current!.click()
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
                                <Button onClick={downloadLog}>
                                    {/*<CSVLink data={csvDataRef.current}>Download csv</CSVLink>}*/}
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