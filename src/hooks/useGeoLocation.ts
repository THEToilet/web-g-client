import {useEffect, useState} from "react";
import {GeoLocation} from '../types/domain'
import {setUserInfoGeoLocation} from '../store/slices/gSignalingStatus'
import {useDispatch} from "react-redux";

const useGeoLocationStatus = () => {
    const [geoLocation, setGeoLocation] = useState<GeoLocation>({
        latitude: 0, longitude: 0
    });

    const dispatch = useDispatch()

    const getGeoLocation = () => {
        //console.log(new Date(), ' : getGeoLocation')
        navigator.geolocation.getCurrentPosition(position => {
            setGeoLocation({
                latitude: Number(position.coords.latitude),
                longitude: Number(position.coords.longitude),
            });
        }, () => {
            // NOTE: 位置情報が得られなかったときはデフォルト値を入れる
            setGeoLocation({
                latitude: 34.673542,
                longitude: 135.433338
            });
            //setUserInfoGeoLocation(geoLocation)
        })
        dispatch(setUserInfoGeoLocation(geoLocation))
    }

    // TODO: 本来の仕様通りのものにする
    // 二秒ごとに位置情報を取得
    useEffect(() => {
        getGeoLocation()
        const regularG = setTimeout(getGeoLocation
            , 2000)
        return () => {
            clearTimeout(regularG)
        }
    }, [getGeoLocation])

    return geoLocation
}
export default useGeoLocationStatus