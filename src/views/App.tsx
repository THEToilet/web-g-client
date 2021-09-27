import {Helmet, HelmetProvider} from 'react-helmet-async'
import {useEffect} from "react";

import useGeoLocationStatus from "../hooks/useGeoLocation"
import useWebSocket from "../hooks/useWebSocket"
import HeaderBar from "../components/HeaderBar"
import Maps from "../components/Maps";
import useConnection from "../hooks/useConnection";
import OperationPanel from "../components/OperationPanel"
import axios from 'axios'

function App() {
    const geoLocation = useGeoLocationStatus()
    const [message, sendMessage] = useWebSocket()
    useConnection(message, sendMessage, geoLocation)

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/stun').then(res => console.log(res))
    }, [])

    return (
        <div className="App" style={{textAlign: "center"}}>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>web-g</title>
                    <link rel="" href="https://web-g"/>
                </Helmet>
                <HeaderBar/>
                <Maps g={geoLocation}/>
                <h2>
                    {geoLocation.lat + " , "}{geoLocation.lng}
                </h2>
                <OperationPanel/>
            </HelmetProvider>
        </div>
    );
}

export default App;