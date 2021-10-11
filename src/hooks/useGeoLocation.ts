import {useEffect, useState} from "react";
import {GeoLocation} from '../types/domain'
import {setUserInfoGeoLocation} from '../slices/gSignalingStatus'
import {useDispatch} from "react-redux";

const useGeoLocationStatus = () => {
    const [geoLocation, setGeoLocation] = useState<GeoLocation>({
        lat: 0, lng: 0
    });

    const dispatch = useDispatch()

    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position)
            setGeoLocation({
                lat: Number(position.coords.latitude),
                lng: Number(position.coords.longitude),
            });
        }, () => {
            setGeoLocation({
                lat: 34.673542,
                lng: 135.433338
            });

        })
        //console.log(geoLocation)
        dispatch(setUserInfoGeoLocation(geoLocation))
    }

    useEffect(() => {
        getGeoLocation()
        const regularG = setTimeout(getGeoLocation
            , 5000)
        return () => {
            clearTimeout(regularG)
        }
    }, [getGeoLocation])

    return geoLocation
}


export default useGeoLocationStatus