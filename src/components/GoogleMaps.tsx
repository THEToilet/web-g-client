import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

import {getGSetting, getGSignalingStatus} from '../store/selector'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {UserInfo} from "../types/domain";

const APIKEY = "";
const GoogleMaps = () => {
    const {surroundingUserList, userInfo} = useSelector(getGSignalingStatus)
    const {searchDistance} = useSelector(getGSetting)

    const [isRefreshingMap, setIsRefreshingMap] = useState<boolean>(false)

    const defaultGeoLocation = {
        position: {
            lat: userInfo.geoLocation.latitude,
            lng: userInfo.geoLocation.longitude,
        },
        zoom: 15
    }

    const refreshMap = async () => {
        setIsRefreshingMap(true);
        setTimeout(() => {
            setIsRefreshingMap(false);
        }, 100);
    };

    useEffect(() => {
        refreshMap().catch((e) => console.log(e))
    }, [searchDistance])

    const Markers = surroundingUserList.map((userInfo : UserInfo) => {
        return <Marker key={userInfo.userID} lat={userInfo.geoLocation.latitude} lng={userInfo.geoLocation.longitude} color="yellow"
                       userInfo={userInfo}/>
    })

    // https://github.com/google-map-react/google-map-react/issues/184
    return (
        <div style={{height: '80vh', width: "100%"}}>
            {!isRefreshingMap && (
                <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultGeoLocation.position}
                                defaultZoom={defaultGeoLocation.zoom} onGoogleApiLoaded={({map, maps}) =>
                    new maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.3,
                        map,
                        center: userInfo.geoLocation,
                        radius: searchDistance,
                    })}>
                    {Markers}
                    <Marker lat={userInfo.geoLocation.latitude} lng={userInfo.geoLocation.longitude} text="My Marker"
                            color="green"/>
                </GoogleMapReact>
            )}
        </div>
    )
}
export default GoogleMaps