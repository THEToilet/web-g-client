import {HelmetProvider} from 'react-helmet-async'
import {useRef, useState} from "react";

import useGeoLocationStatus from "../hooks/useGeoLocation"
import useWebSocket from "../hooks/useWebSocket"
import HeaderBar from "../components/HeaderBar"
import useConnection from "../hooks/useConnection";
import OperationPanel from "../components/OperationPanel"
import Video from "../components/Video";
import OpenStreetMaps from "../components/OpenStreetMaps";
import {WSMessages} from "../handler/wsMessages";
import useUserMedia from "../hooks/useUserMedia";
import RTConnection from "../handler/RTConnection";
import Helm from "../components/Helmet";

function App() {
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)

    const localMessageRef = useRef<HTMLTextAreaElement>(null)
    const remoteMessageRef = useRef<HTMLTextAreaElement>(null)

    const stream = useUserMedia(localVideoRef)
    useGeoLocationStatus()

    const csvDataRef = useRef<{ time: string; value: string; key: string }[]>([
        {"key": "csv", "value": "output", "time": "2021-11-12-12:00"}
    ])

    // NOTE: WebSocket接続
    const [message, sendMessage] = useWebSocket(csvDataRef)
    const wsMessage = new WSMessages(sendMessage)
    // NOTE: WebRTC関連処理
    const [setICECandidate, setOffer, setAnswer, connect, disconnect, sendDataChanelMessage] = RTConnection(stream, localVideoRef, remoteVideoRef, wsMessage, localMessageRef, remoteMessageRef)
    useConnection(message, wsMessage, setICECandidate, setOffer, setAnswer, disconnect, csvDataRef)

    // TODO:　後で場所変更させる
    const [isMapGoogle, setIsMapGoogle] = useState<boolean>(true)
    const [destination, setDestination] = useState<string>('setDestination')

    /*
    const changeMap = () => {
        setIsMapGoogle(!isMapGoogle)
    }
     */

    const handleChange = (event: any) => {
        setDestination(event.target.value)
    }

    return (
        <div className="App" style={{textAlign: "center"}}>
            <HelmetProvider>
                <Helm/>
                <HeaderBar/>
                {/*isMapGoogle ? (<GoogleMaps connect={connect}/>) : (<OpenStreetMaps/>)*/}
                {/*<button onClick={changeMap}> Change map</button>*/}
                <OpenStreetMaps connect={connect}/>
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