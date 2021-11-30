import React, {useRef} from "react";
import Video from "../components/Video";
import {TextField, Paper, Container, Box} from "@mui/material";
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
        <div style={{textAlign: "center"}}>
            <HelmetProvider>
                <Helm/>
                <HeaderBar/>
                <Container component="main" sx={{pb: 2}}>
                    <CssBaseline/>
                    <Box sx={{display: 'flex'}}>
                        <Paper elevation={8} sx={{mt: 20, float: 'left'}}>
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
                                <Typography component="h1" variant="h5">
                                    G-Client
                                </Typography>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="name"
                                                label="Your name"
                                                name="name"
                                                autoComplete="name"
                                                variant="standard"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                    >
                                        advance
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper elevation={8} sx={{mt: 20, mx: 10, float: 'left'}}>
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
                                <Typography component="h1" variant="h5">
                                    G-Client
                                </Typography>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="name"
                                                label="Your name"
                                                name="name"
                                                autoComplete="name"
                                                variant="standard"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                    >
                                        advance
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                    <Container sx={{pt: 10, pb: 5}}>
                        <Paper>
                            <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                                <Box sx={{}}>
                                    <Button variant="contained" color="success">
                                        Success
                                    </Button>
                                </Box>
                                <Box sx={{}}>
                                    <Button variant="contained" color="success">
                                        Success
                                    </Button>
                                </Box>
                                <Box sx={{}}>
                                    <Button variant="contained" color="success">
                                        Success
                                    </Button>
                                </Box>
                                <Box sx={{}}>
                                    <Button variant="contained" color="success">
                                        Success
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Container>
                    <Chat/>
                </Container>
            </HelmetProvider>
        </div>
    )
}
export default VideoChat
