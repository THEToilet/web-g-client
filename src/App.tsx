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
    const [isPush, setIsPush] = useState<boolean>(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
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
        <div className="App" style={{height: '100vh', width: '100%'}}>
            <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={geoLocation} defaultZoom={20}>
                <Marker defaultCenter={geoLocation}/>
            </GoogleMapReact>
            <button onClick={handleClick}>
                Click me
            </button>
            {console.log(geoLocation)}
        </div>
    );
}

export default App;