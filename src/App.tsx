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
    const [geoLocation, setGeoLocation] = useState<GoogleMapReact.Coords>({
        lat: 35.70225890, lng: 139.77447330
    });
    const [defaultGeoLocation, setDefaultGeoLocation] = useState<GoogleMapReact.Coords>({
        lat: 35.70225890, lng: 139.77447330
    });
    const [isPush, setIsPush] = useState<boolean>(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            console.log(Number.isNaN(Number(geoLocation.lat)))
            console.log(Number.isNaN(geoLocation.lng))
            setGeoLocation({
                lat: Number(position.coords.latitude),
                lng: Number(position.coords.longitude),
            });
        })
    }, [isPush])

    const handleClick = () => {
        console.log("unko")
        setIsPush(!isPush)
    }

    return (
        <div className="App" style={{height: '80vh', width: '100%'}}>
            <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultGeoLocation} defaultZoom={10}>
                <Marker center={geoLocation}/>
            </GoogleMapReact>
            <button onClick={handleClick}>
                Click me
            </button>
            {console.log(geoLocation)}
        </div>
    );
}

export default App;