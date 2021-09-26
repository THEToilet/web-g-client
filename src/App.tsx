import {Helmet, HelmetProvider} from 'react-helmet-async'

import useGeoLocationStatus from "./hooks/useGeoLocation"
import useWebSocket from "./hooks/useWebSocket"
import TextField from '@mui/material/TextField';
import HeaderBar from "./components/HeaderBar"
import G from "./components/GeoLocation";
import useConnection from "./hooks/useConnection";


function App() {
//    const [isPush, setIsPush] = useState<boolean>(false)
    //const [isRegister, setIsRegister] = useState<boolean>(false)

    //const [messageString, setMessageString] = useState("")
    const geoLocation = useGeoLocationStatus()
    const [message, sendMessage] = useWebSocket()
    const conn = useConnection(message, sendMessage, geoLocation)

    return (
        <div className="App" style={{/*{height: '80vh', width: '100%',*/ textAlign: "center"}}>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>web-g</title>
                    <link rel="" href="https://web-g"/>
                </Helmet>

                <HeaderBar/>
                <G g={geoLocation}/>

                <h2>
                    {geoLocation.lat + " , "}{geoLocation.lng}
                </h2>
                <TextField label={"SearchDistance"} defaultValue={"100"}/>
                {/*isRegister ? <p>registered</p> : <p>is not registered</p>*/}
                {/* <textarea rows={10} cols={10} defaultValue={messageString}/>*/}
            </HelmetProvider>

        </div>
    );
}

export default App;