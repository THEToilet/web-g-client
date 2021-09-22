import {useCallback, useEffect, useState} from 'react';
import GoogleMapReact from "google-map-react";
import {useGeoLocationStatus} from "./hooks/GeoLocation"
import TextField from '@mui/material/TextField';
import HeaderBar from "./components/HeaderBar"

const APIKEY = "";
const socket = new WebSocket("ws://127.0.0.1:8080/signaling")

function App() {
    const [isPush, setIsPush] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [messageString, setMessageString] = useState("")
    const geoLocation = useGeoLocationStatus()


    useEffect( () => {
        socket.addEventListener('open', onOpen)
        socket.addEventListener('message', onMessage)
        socket.addEventListener('close', onClose)
        socket.addEventListener('error', onError)
        console.log(socket)
    }, [socket])

    let onOpen = () => {
        socket.send("Hello")
        setMessageString( messageString + "socket is open" + "\n" )
        socket.send(JSON.stringify({
            type: 'send',
            message : 'unko'
        }))
    }
    let onMessage = (event) => {
        console.log(event.data)
        setMessageString( messageString + event.data + "\n" )
    }
    let onClose = (event) => {
        console.log(event)
    }
    let onError = (error) => {
        console.log(error)
    }


    useEffect(() => {
        console.log("component is render")
    })

    useEffect(() => {
       const hello = setInterval(() => {
                console.log("hello")
        }, 1000)
        return clearInterval(hello)
    }, [])

    const handleClick = useCallback(() => {
        console.log("unko")
        setIsPush(!isPush)
        socket.send(JSON.stringify({
            type: 'register',
            userInfo : {
                userID: '',
                publicIP: '127.0.0.1',
                publicPort: 8080,
                privateIP: '127.0.0.1',
                privatePort: 8080,
                latitude: geoLocation.lat,
                longitude: geoLocation.lng,
            }
        }))
    },[isPush])

    const handleApiLoaded = ({map, maps}) => {
        const bounds= new maps.LatLngBounds();
        const marker =  new maps.Marker({
            map,
            position: geoLocation
        })
        bounds.extend(marker.position)
        map.fitBounds(bounds)
    }

    const defaultGeoLocation = {
        position: {
         lat : 35.70225890,
         lng: 139.77447330
        },
        zoom: 10
    }

    const handleClickRegister = useCallback(() => {
        console.log("unko")
        setMessageString( messageString + "Register is click no value is" + isRegister + "\n" )
        setIsRegister(!isRegister)
    },[isRegister])

    return (
        <div className="App" style={{height: '80vh', width: '100%'}}>
            <HeaderBar/>
            <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultGeoLocation.position} defaultZoom={defaultGeoLocation.zoom} onGoogleApiLoaded={handleApiLoaded}/>

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
            <textarea rows={10} cols={10} defaultValue={messageString} />
        </div>
    );
}

export default App;