import {HelmetProvider} from "react-helmet-async";
import Helm from "../components/Helmet";
import HeaderBar from "../components/HeaderBar";
import {Box, Container, Paper, TextField} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React from "react";

const Test = () => {
    return (
        <>
            <div style={{textAlign: "center"}}>
                <HelmetProvider>
                    <Helm/>
                    <HeaderBar/>
                    <Container component="main" sx={{pb: 10}}>
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
                    </Container>
                </HelmetProvider>
            </div>
        </>
    )
}

export default Test;