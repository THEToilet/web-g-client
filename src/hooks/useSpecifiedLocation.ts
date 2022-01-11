import React, {useEffect, useRef} from "react";
import {GeoLocation} from '../types/domain'
import {setUserInfoGeoLocation} from '../store/slices/gSignalingStatus'
import {useDispatch} from "react-redux";
import timeFormatter from "../shared/utils/timeFormatter";

const useSpecifiedLocation = (logDataRef: React.MutableRefObject<{}[]>) => {

    const walkIntervalRef = useRef<NodeJS.Timeout>()

    const dispatch = useDispatch()
    const interval = 1000
    /*
    const highGeo: GeoLocation = {
        latitude: 35.954843,
        longitude: 139.6578495,
    }
    const lowGeo: GeoLocation = {
        latitude: 35.95033685,
        longitude: 139.652304,
    }
    */
    // NOTE: 領域の中心座標
    const currentGeoLocation: GeoLocation = {
        latitude: 35.952589925,
        longitude: 139.65507675,
    }

    useEffect(() => {
        walk()
        return () => {
            clearTimeout(walkIntervalRef.current!)
        }
    }, [])

    const walk = () => {

        dispatch(setUserInfoGeoLocation(currentGeoLocation))
        logDataRef.current.push({
            time: timeFormatter(new Date()),
            geoLocation: currentGeoLocation,
            message: 'ON-GEOLOCATION-CHANGE'
        })
        walkIntervalRef.current = setTimeout(() => walk(), interval)
    }
}
export default useSpecifiedLocation