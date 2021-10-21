import {Helmet, HelmetProvider} from 'react-helmet-async'
import {useEffect, useRef, useState} from "react";

import useGeoLocationStatus from "../hooks/useGeoLocation"
import useWebSocket from "../hooks/useWebSocket"
import HeaderBar from "../components/HeaderBar"
import GoogleMaps from "../components/GoogleMaps";
import useConnection from "../hooks/useConnection";
import OperationPanel from "../components/OperationPanel"
import Video from "../components/Video";
import OpenStreetMaps from "../components/OpenStreetMaps";
import {WSMessages} from "../handler/wsMessages";
import useUserMedia from "../hooks/useUserMedia";
import RTConnection from "../handler/RTConnection";

function App() {
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)

    useUserMedia(localVideoRef)
    useGeoLocationStatus()
    // NOTE: WebSocket接続
    const [message, sendMessage] = useWebSocket()
    const wsMessage = new WSMessages(sendMessage)
    // NOTE: WebRTC関連処理
    const [setICECandidate, setOffer, setAnswer, connect, disconnect] = RTConnection(remoteVideoRef, wsMessage)
    useConnection(message, wsMessage, setICECandidate, setOffer, setAnswer, disconnect)
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
                <button onClick={changeMap}>Change map</button>
                <OperationPanel/>
                <Video localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef}/>
            </HelmetProvider>
        </div>
    );
}

export default App;