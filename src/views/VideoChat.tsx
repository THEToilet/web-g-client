import React, {useRef} from "react";
import {
    Paper,
    Container,
    Box,
} from "@mui/material";
import {HelmetProvider} from "react-helmet-async";
import Helm from "../components/Helmet";
import HeaderBar from "../components/HeaderBar";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chat from "../components/Chat";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import {useSelector} from "react-redux";
import {getP2PStatus} from "../store/selector";
import useUserMedia from "../hooks/useUserMedia";
import useGeoLocationStatus from "../hooks/useGeoLocation";
import useWebSocket from "../hooks/useWebSocket";
import {WSMessages} from "../handler/wsMessages";
import RTConnection from "../handler/RTConnection";
import useConnection from "../hooks/useConnection";

const VideoChat = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)

    const localMessageRef = useRef<HTMLTextAreaElement>(null)
    const remoteMessageRef = useRef<HTMLTextAreaElement>(null)

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(
            (stream) => {
                localVideoRef.current!.srcObject = stream
                //localStream.current = stream
            }
        ).catch((error) => {
                console.log(error)
            }
        )
    }

    const csvDataRef = useRef<{time: string; value: string; key: string }[]>([
        {"key": "csv", "value": "output", "time": "2021-11-12-12:00"}
    ])

    useGeoLocationStatus()

    const stream = useUserMedia(localVideoRef)
    const [message, sendMessage] = useWebSocket(csvDataRef)
    const wsMessage = new WSMessages(sendMessage)
    // NOTE: WebRTC関連処理
    const [setICECandidate, setOffer, setAnswer, connect, disconnect, sendDataChanelMessage] = RTConnection(stream, localVideoRef, remoteVideoRef, wsMessage, localMessageRef, remoteMessageRef)
    useConnection(message, wsMessage, setICECandidate, setOffer, setAnswer, disconnect, csvDataRef)

    const [state, setState] = React.useState<boolean>(false);
    const [localVideoState, setLocalVideoState] = React.useState<boolean>(true);
    const [remoteVideoState, setRemoteVideoState] = React.useState<boolean>(true);

    const {destinationUserID} = useSelector(getP2PStatus)

    const toggleChat = (open: boolean) => () => {
        setState(open);
    };

    return (
        <div style={{textAlign: "center"}}>
            <HelmetProvider>
                <Helm/>
                <HeaderBar/>
                <Container component="main" sx={{pb: 2}}>
                    <CssBaseline/>
                    <Box>
                        <Typography variant="h5" gutterBottom component="div">
                            {destinationUserID}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Paper elevation={8} sx={{mt: 20}}>
                            <Box
                                sx={{
                                    mx: 20,
                                    my: 10,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {localVideoState ?
                                    (<video ref={localVideoRef} autoPlay={true}
                                            style={{width: '320px', height: '240px', border: '5px solid black'}}/>)
                                    :
                                    (<Avatar sx={{m: 1, bgcolor: 'primary.dark'}}>
                                        G
                                    </Avatar>)
                                }
                            </Box>
                        </Paper>
                        <Paper elevation={8} sx={{mt: 20, mx: 10}}>
                            <Box
                                sx={{
                                    mx: 20,
                                    my: 10,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {remoteVideoState ?
                                    (<video ref={remoteVideoRef} autoPlay={true}
                                            style={{width: '320px', height: '240px', border: '5px solid black'}}/>)
                                    :
                                    (<Avatar sx={{m: 1, bgcolor: 'primary.dark'}}>
                                        G
                                    </Avatar>)
                                }
                            </Box>
                        </Paper>
                    </Box>
                    <Container sx={{pt: 10, pb: 5, width: '30%'}}>
                        <Paper>
                            <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                                <Box sx={{}}>
                                    <IconButton color="primary" aria-label="upload picture" component="span"
                                                onClick={toggleChat(true)}>
                                        <ChatBubbleIcon/>
                                    </IconButton>
                                </Box>
                                <Box sx={{}}>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <MicIcon/>
                                    </IconButton>
                                </Box>
                                <Box sx={{}}>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <VolumeUpIcon/>
                                    </IconButton>
                                </Box>
                                <Box sx={{}}>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhoneDisabledIcon/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Container>
                    {state ? (
                        <Chat toggleChat={toggleChat}/>) : (<></>)}
                </Container>
            </HelmetProvider>
        </div>
    )
}
export default VideoChat
