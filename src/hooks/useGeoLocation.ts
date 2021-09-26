import {useEffect, useState} from "react";
import {GeoLocation} from '../types/domain'

const useGeoLocationStatus = () => {
    const [geoLocation, setGeoLocation] = useState<GeoLocation>({
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
        },data =>{
            setGeoLocation({
                lat: 34.673542,
                lng: 135.433338
            });

        })
        console.log("ddd")
        console.log(geoLocation)
    }, [])

    return geoLocation
}

export default useGeoLocationStatus