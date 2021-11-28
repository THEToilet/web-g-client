import React from "react";
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

const Welcome = () => {
    return (
        <div style={{textAlign: "center"}}>
            <HelmetProvider>
                <Helm/>
                <HeaderBar/>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Paper elevation={8} sx={{my: {xs: 30, md: 10}, p: {xs: 50, md: 20}}}>
                        <Box
                            sx={{
                                marginTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                G
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Start
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
                </Container>
            </HelmetProvider>
        </div>
    )
}
export default Welcome