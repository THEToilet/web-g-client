import React, {useState} from 'react';

type GeoLocationCoordinates = {
    accuracy: number;
    altitude: number; // 高度
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: string;
}


function App() {
    const [geoLocation, setGeoLocation] = useState<GeolocationCoordinates>({
        accuracy: 0,
        altitude: 0, // 高度
        altitudeAccuracy: 0,
        heading: 0,
        latitude: 0,
        longitude: 0,
        speed: 0,

    })
    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords)
            setGeoLocation({
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed,
                accuracy: position.coords.accuracy
            })
        })
    }
    return (
        <div className="App"> {console.log(getCurrentPosition())}
        </div>);
}

export default App;