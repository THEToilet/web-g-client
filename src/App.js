import {useEffect, useState} from 'react';
import GoogleMapReact from "google-map-react";

const APIKEY = "";
const socket = new WebSocket("ws://127.0.0.1:8080/signaling")

function App() {

    const [geoLocation, setGeoLocation] = useState({
        //lat: 35.70225890, lng: 139.77447330
        lat: 0, lng: 0
    });

    const [isPush, setIsPush] = useState(false)
    const [isRegister, setIsRegister] = useState(false)

    useEffect( () => {
        socket.addEventListener('open', onOpen)
        socket.addEventListener('message', onMessage)
        socket.addEventListener('close', onClose)
        socket.addEventListener('error', onError)
        console.log(socket)
    }, [socket])

    let onOpen = () => {
        socket.send("Hello")
        socket.send(JSON.stringify({
            type: 'send',
            message : 'unko'
        }))
    }
    let onMessage = (event) => {
        console.log(event.data)
    }
    let onClose = (event) => {
        console.log(event)
    }
    let onError = (error) => {
        console.log(error)
    }

    useEffect(() => {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position)
                //console.log(Number.isNaN(Number(geoLocation.lat)))
                //console.log(Number.isNaN(geoLocation.lng))
                setGeoLocation({
                    lat: Number(position.coords.latitude),
                    lng: Number(position.coords.longitude),
                });
            })
        console.log("ddd")
        console.log(geoLocation)
    }, [isPush])

    useEffect(() => {
        console.log("component is render")
    })

    useEffect(() => {
       setInterval(() => {
                console.log("hello")
        }, 1000)
    }, [])

    const handleClick = () => {
        console.log("unko")
        setIsPush(!isPush)
        socket.send(JSON.stringify({
            type: 'register',
            user : {

            },
            userInfo : {

            }
        }))
    }

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

    const handleClickRegister = () => {
        console.log("unko")
        setIsRegister(!isRegister)
    }

    return (
        <div className="App" style={{height: '80vh', width: '100%'}}>

            {//<GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} onGoogleApiLoaded={handleApiLoaded} onClick={setLatLng}>
            }
            <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultGeoLocation.position} defaultZoom={defaultGeoLocation.zoom} onGoogleApiLoaded={handleApiLoaded}>
            </GoogleMapReact>
            <button onClick={handleClick}>
                Click me
            </button>
            <button onClick={handleClickRegister}>
                register
            </button>
            <h2>
                {geoLocation.lat + ","}{geoLocation.lng}
            </h2>
            {isRegister ? <p>registered</p> : <p>is not registered</p>}
        </div>
    );
}

export default App;