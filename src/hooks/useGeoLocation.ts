import {useEffect, useState} from "react";

const useGeoLocationStatus = () => {
    const [geoLocation, setGeoLocation] = useState({
        lat: 0, lng: 0
    });

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
    }, [])

    return geoLocation
}

export default useGeoLocationStatus