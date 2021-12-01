import React, {useState} from "react";
import {HelmetProvider} from "react-helmet-async";
import Helm from "../components/Helmet";
import HeaderBar from "../components/HeaderBar";
import {Paper} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setUserName} from '../store/slices/gSignalingStatus'
import useUserMediaList from "../hooks/useUserNediaList";

const Welcome = () => {
    const [userName, setUN] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const submitName = async () => {
        if (userName !== '') {
            console.log(userName)
            navigate('/test')
        }
    }

    const handleChange = (e: any) => {
        setUN(() => e.target.value)
        dispatch(setUserName(e.target.value))
    }

    useUserMediaList()

    return (
        <div style={{textAlign: "center"}}>
            <HelmetProvider>
                <Helm/>
                <HeaderBar/>
                <Container component="main" sx={{width: '40%', px: '30%', pb: 10}}>
                    <CssBaseline/>
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
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={submitName}
                                    sx={{mt: 3, mb: 2}}
                                >
                                    advance
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </HelmetProvider>
        </div>
    )
}
export default Welcome