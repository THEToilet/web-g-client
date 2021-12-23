import React, {useEffect, useRef, useState} from "react";
import {GeoLocation} from '../types/domain'
import {setUserInfoGeoLocation} from '../store/slices/gSignalingStatus'
import {useDispatch} from "react-redux";

const useRandomWayPoint = (csvDataRef: React.MutableRefObject<{ time: string; value: string; key: string }[]>) => {

    const walkIntervalRef = useRef<NodeJS.Timeout>()

    const dispatch = useDispatch()
    const interval = 1000
    const highGeo: GeoLocation = {
        latitude: 35.954843,
        longitude: 139.6578495,
    }
    const lowGeo: GeoLocation = {
        latitude: 35.95033685,
        longitude: 139.652304,
    }
    let currentGeoLocation: GeoLocation = {
        latitude: (Math.random() * (highGeo.latitude - lowGeo.latitude)) + lowGeo.latitude,
        longitude: (Math.random() * (highGeo.longitude - lowGeo.longitude)) + lowGeo.longitude,
    }

    useEffect(() => {
        walk()
        return () => {
            clearTimeout(walkIntervalRef.current!)
        }
    }, [])

    const walk = () => {
        let stopTime = Math.random() * 10
        let speed = Math.random() * 60
        let direction = Math.random() * 360
        console.log("stopTime : " + stopTime + "speed : " + speed + "direction : " + direction + new Date().toDateString())

        let newGeoLocation: GeoLocation = {
            latitude: getRandomWayLatitude(currentGeoLocation.latitude, direction, speed, interval),
            longitude: getRandomWayLongitude(currentGeoLocation.longitude, direction, speed, interval),
        }

        newGeoLocation.latitude = Math.max(Math.min(newGeoLocation.latitude, highGeo.latitude), lowGeo.latitude)
        newGeoLocation.longitude = Math.max(Math.min(newGeoLocation.longitude, highGeo.longitude), lowGeo.longitude)

        dispatch(setUserInfoGeoLocation(newGeoLocation))
        csvDataRef.current.push({
            'time': new Date().toLocaleString('ja-JP-u-ca-japanese'),
            value: String(newGeoLocation),
            key: 'geoLocation ' + newGeoLocation.latitude + ' ' + newGeoLocation.longitude
        })
        walkIntervalRef.current = setTimeout(() => walk(), stopTime * 1000)
    }

    const getRandomWayLatitude = (latitude: number, direction: number, speed: number, interval: number) => {
        let travelDistance = (speed / 3.6) * (interval / 1000)
        const latitude1mAngle = 0.0000090123
        return latitude + (travelDistance * latitude1mAngle * Math.cos(direction * Math.PI / 180))
    }

    const getRandomWayLongitude = (longitude: number, direction: number, speed: number, interval: number) => {
        let travelDistance = (speed / 3.6) * (interval / interval)
        const longitude1mAngle = 0.0000110910
        return longitude + (travelDistance * longitude1mAngle * Math.sin(direction * Math.PI / 180))
    }
}
export default useRandomWayPoint
