import {Helmet, HelmetProvider} from 'react-helmet-async'
import {useEffect, useState} from "react";

import useGeoLocationStatus from "../hooks/useGeoLocation"
import useWebSocket from "../hooks/useWebSocket"
import HeaderBar from "../components/HeaderBar"
import GoogleMaps from "../components/GoogleMaps";
import useConnection from "../hooks/useConnection";
import OperationPanel from "../components/OperationPanel"
import Video from "../components/Video";
import OpenStreetMaps from "../components/OpenStreetMaps";

function App() {
    useGeoLocationStatus()
    const [message, sendMessage] = useWebSocket()
    useConnection(message, sendMessage)
    const [isMapGoogle, setIsMapGoogle] = useState<boolean>(true)

    const changeMap = () => {
        setIsMapGoogle(!isMapGoogle)
    }

    return (
        <div className="App" style={{textAlign: "center"}}>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>web-g</title>
                    <link rel="" href="https://web-g"/>
                </Helmet>
                <HeaderBar/>
                {isMapGoogle ? (<GoogleMaps/>) : (<OpenStreetMaps/>)}
                <button  onClick={changeMap}>Change map</button>
                <OperationPanel/>
                <Video/>
            </HelmetProvider>
        </div>
    );
}

export default App;