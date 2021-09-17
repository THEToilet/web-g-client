import {useEffect, useState} from 'react';
import GoogleMapReact from "google-map-react";
import Marker from "google-map-react";

/*
type GeoLocationCoordinates = {
    accuracy: number;
    altitude: number; // 高度
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
}
 */

const APIKEY = "";

function App() {
    let socket = new WebSocket("ws://127.0.0.1:8080/signaling")

    const [geoLocation, setGeoLocation] = useState<GoogleMapReact.Coords>({
        //lat: 35.70225890, lng: 139.77447330
        lat: 0, lng: 0
    });
    /*
    const [defaultGeoLocation, setDefaultGeoLocation] = useState<GoogleMapReact.Coords>({
        lat: 35.70225890, lng: 139.77447330
    });
    */
    const [isPush, setIsPush] = useState<boolean>(false)

    useEffect( () => {
        socket.addEventListener('open', onOpen)
        socket.addEventListener('message', onMessage)
        socket.addEventListener('close', onClose)
        socket.addEventListener('error', onError)
    }, [])

    let onOpen = () => {
        socket.send("Hello")
        socket.send(JSON.stringify({
           type: 'send',
           message : 'unko'
        }))
    }
    let onMessage = (event : any) => {
       console.log(event.data)
    }
    let onClose = (event : any) => {
        console.log(event)
    }
    let onError = (error : any) => {
        console.log(error)
    }

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position)
                console.log(Number.isNaN(Number(geoLocation.lat)))
                console.log(Number.isNaN(geoLocation.lng))
                setGeoLocation({
                    lat: Number(position.coords.latitude),
                    lng: Number(position.coords.longitude),
                });
            })
        }
        else{
            console.log("error")
        }
    }, [isPush])

    const handleClick = () => {
        console.log("unko")
        setIsPush(!isPush)
    }

    const defaultProps = {
        center: {
            lat: 35.70225890, lng: 139.77447330
        },
        zoom: 11
    }


    return (
        <div className="App" style={{height: '80vh', width: '100%'}}>

            <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
            </GoogleMapReact>

            <button onClick={handleClick}>
                Click me
            </button>
            {console.log(geoLocation)}
        </div>
    );
}

export default App;