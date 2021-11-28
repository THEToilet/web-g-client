import React from "react";
import {HelmetProvider} from "react-helmet-async";
import Helm from "../components/Helmet";
import HeaderBar from "../components/HeaderBar";
import {Paper} from "@mui/material";

const Welcome = () => {
    return (
        <div style={{textAlign: "center"}}>
            <HelmetProvider>
                <Helm/>
                <HeaderBar/>
                <Paper elevation={3}/>
            </HelmetProvider>
        </div>
    )
}
export default Welcome