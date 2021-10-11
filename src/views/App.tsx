import {Helmet, HelmetProvider} from 'react-helmet-async'
import {useEffect} from "react";

import useGeoLocationStatus from "../hooks/useGeoLocation"
import useWebSocket from "../hooks/useWebSocket"
import HeaderBar from "../components/HeaderBar"
import GoogleMaps from "../components/GoogleMaps";
import useConnection from "../hooks/useConnection";
import OperationPanel from "../components/OperationPanel"
import axios from 'axios'
import Video from "../components/Video";
import OpenStreetMaps from "../components/OpenStreetMaps";

function App() {
    useGeoLocationStatus()
    const [message, sendMessage] = useWebSocket()
    useConnection(message, sendMessage)

    return (
        <div className="App" style={{textAlign: "center"}}>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>web-g</title>
                    <link rel="" href="https://web-g"/>
                </Helmet>
                <HeaderBar/>
                <GoogleMaps/>
                <OpenStreetMaps/>
                <OperationPanel/>
                <Video/>
            </HelmetProvider>
        </div>
    );
}

export default App;