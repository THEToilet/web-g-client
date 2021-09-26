import {useCallback, useEffect, useState} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async'

import useGeoLocationStatus from "./hooks/useGeoLocation"
import useWebSocket from "./hooks/useWebSocket"
import TextField from '@mui/material/TextField';
import HeaderBar from "./components/HeaderBar"
import GeoLocation from "./components/GeoLocation";
import {ActionType, SignalingType} from './types/domain'
import useConnection from "./hooks/useConnection";


function App() {
    const [isPush, setIsPush] = useState<boolean>(false)
    const [isRegister, setIsRegister] = useState<boolean>(false)

    const [messageString, setMessageString] = useState("")
    const geoLocation = useGeoLocationStatus()
    const [message, sendMessage] = useWebSocket()
    const conn = useConnection(message, sendMessage)




    useEffect(() => {
        const hello = setInterval(() => {
            console.log("hello")
        }, 1000)
        return clearInterval(hello)
    }, [])

    const handleClick = () => {
        console.log(message)
        sendMessage("dd");
        console.log("unko")
        setIsPush(!isPush)
        JSON.stringify({
            type: 'register',
            userInfo: {
                userID: '',
                publicIP: '127.0.0.1',
                publicPort: 8080,
                privateIP: '127.0.0.1',
                privatePort: 8080,
                latitude: geoLocation.lat,
                longitude: geoLocation.lng,
            }
        })
    }

    const handleClickRegister = () => {
        console.log("unko")
        setMessageString(messageString + "Register is click no value is" + isRegister + "\n")
        setIsRegister(!isRegister)
    }

    return (
        <div className="App" style={{height: '80vh', width: '100%'}}>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>web-g</title>
                    <link rel="" href="https://web-g"/>
                </Helmet>

                <HeaderBar/>
                <GeoLocation geoLocation={geoLocation} />

                <button onClick={handleClick}>
                    Click me
                </button>
                <button onClick={handleClickRegister}>
                    register
                </button>
                <h2>
                    {geoLocation.lat + " , "}{geoLocation.lng}
                </h2>
                <TextField label={"SearchDistance"} defaultValue={"100"}/>
                {isRegister ? <p>registered</p> : <p>is not registered</p>}
                <textarea rows={10} cols={10} defaultValue={messageString}/>
            </HelmetProvider>

        </div>
    );
}

export default App;