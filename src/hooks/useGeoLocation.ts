import {useEffect, useState} from "react";
import {GeoLocation} from '../types/domain'

import {getGSignalingStatus} from '../selector'
import {setUserInfoGeoLocation} from '../slices/gSignalingStatus'
import {useDispatch, useSelector} from "react-redux";

const useGeoLocationStatus = () => {
    const [geoLocation, setGeoLocation] = useState<GeoLocation>({
        lat: 0, lng: 0
    });

    const {userInfo} = useSelector(getGSignalingStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            //console.log(Number.isNaN(Number(geoLocation.lat)))
            //console.log(Number.isNaN(geoLocation.lng))
            setGeoLocation({
                lat: Number(position.coords.latitude),
                lng: Number(position.coords.longitude),
            });
        }, data => {
            setGeoLocation({
                lat: 34.673542,
                lng: 135.433338
            });

        })
        console.log(geoLocation)
        dispatch(setUserInfoGeoLocation(geoLocation))
    }, [dispatch, geoLocation])

    return geoLocation
}

export default useGeoLocationStatus