import React, {useRef} from "react";
import Video from "../components/Video";
import {
    TextField,
    Paper,
    Container,
    Box,
    ListItem,
    ListItemIcon,
    Divider,
    ListItemText,
    List,
    SwipeableDrawer
} from "@mui/material";
import {HelmetProvider} from "react-helmet-async";
import Helm from "../components/Helmet";
import HeaderBar from "../components/HeaderBar";
import OpenStreetMaps from "../components/OpenStreetMaps";
import OperationPanel from "../components/OperationPanel";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Chat from "../components/Chat";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const VideoChat = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    /*

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

    const [state, setState] = React.useState<boolean>(false);

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
                                <Avatar sx={{m: 1, bgcolor: 'primary.dark'}}>
                                    G
                                </Avatar>
                                <video ref={localVideoRef} autoPlay={true}
                                       style={{width: '320px', height: '240px', border: '5px solid black'}}/>
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
                                <Avatar sx={{m: 1, bgcolor: 'primary.dark'}}>
                                    G
                                </Avatar>
                                <video ref={localVideoRef} autoPlay={true}
                                       style={{width: '320px', height: '240px', border: '5px solid black'}}/>
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
