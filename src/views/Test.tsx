import {HelmetProvider} from "react-helmet-async";
import Helm from "../components/Helmet";
import HeaderBar from "../components/HeaderBar";
import {Box, Container, Paper, TextField} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import OpenStreetMaps from "../components/OpenStreetMaps";
import OperationPanel from "../components/OperationPanel";

const Test = () => {
    const [destination, setDestination] = useState<string>('setDestination')
    const handleChange = (event: any) => {
        setDestination(event.target.value)
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
                                        pt: 20,
                                        pb: 20,
                                        my: 10,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <OperationPanel/>
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