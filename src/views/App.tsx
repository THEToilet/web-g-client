import {Helmet, HelmetProvider} from 'react-helmet-async'
import {useRef, useState} from "react";

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

    const localMessageRef = useRef<HTMLTextAreaElement>(null)
    const remoteMessageRef = useRef<HTMLTextAreaElement>(null)

    const stream = useUserMedia(localVideoRef)
    useGeoLocationStatus()
    // NOTE: WebSocket接続
    const [message, sendMessage] = useWebSocket()
    const wsMessage = new WSMessages(sendMessage)
    // NOTE: WebRTC関連処理
    const [setICECandidate, setOffer, setAnswer, connect, disconnect,sendDataChanelMessage] = RTConnection(stream, localVideoRef, remoteVideoRef, wsMessage, localMessageRef, remoteMessageRef)
    useConnection(message, wsMessage, setICECandidate, setOffer, setAnswer, disconnect)

    // TODO:　後で場所変更させる
    const [isMapGoogle, setIsMapGoogle] = useState<boolean>(true)
    const [destination, setDestination] = useState<string>('setDestination')

    const changeMap = () => {
        setIsMapGoogle(!isMapGoogle)
    }

    const handleChange = (event : any) => {
        setDestination(event.target.value)
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
                {/*isMapGoogle ? (<GoogleMaps connect={connect}/>) : (<OpenStreetMaps/>)*/}
                <OpenStreetMaps/>
                <button onClick={changeMap}>Change map</button>
                <button onClick={async () => connect(destination)}>Connect</button>
                <textarea value={destination} onChange={handleChange}/>
                <OperationPanel/>
                <Video localVideoRef={localVideoRef} remoteVideoRef={remoteVideoRef}/>
                <textarea readOnly={true} ref={remoteMessageRef}/>
                <textarea ref={localMessageRef}/>
                <button onClick={sendDataChanelMessage}>SendDataChannel</button>
            </HelmetProvider>
        </div>
    );
}

export default App;