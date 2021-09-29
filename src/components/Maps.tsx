import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

import {getGSignalingStatus} from '../selector'
import {useSelector} from "react-redux";

const APIKEY = "";
const Maps = () => {
    const {surroundingUserList} = useSelector(getGSignalingStatus)

    const {userInfo} = useSelector(getGSignalingStatus)

    const defaultGeoLocation = {
        position: {
            lat: userInfo.geoLocation.lat,
            lng: userInfo.geoLocation.lng,
        },
        zoom: 15
    }

    const Markers = surroundingUserList.map((userInfo) => {
        return <Marker key={userInfo.userID} lat={userInfo.latitude} lng={userInfo.longitude} color="yellow"
                       userInfo={userInfo}/>
    })

    {/*<Marker lat={35.9432136} lng={139.621288} text="My Marker" color="red"/>*/}
    {/*<Marker lat={35.943207099999995} lng={139.6211672} text="My Marker" color="blue"/>*/}
    // TODO: userInfoを流し込むようにする 今だと型が合わなくてエラーでる

    // https://github.com/google-map-react/google-map-react/issues/184
    return (
        <div style={{height: '100vh', width: "100%"}}>
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
                    radius: 300,
                })}>
                {Markers}
                <Marker lat={userInfo.geoLocation.lat} lng={userInfo.geoLocation.lng} text="My Marker" color="green" />
            </GoogleMapReact>
            <h3>{surroundingUserList.length}</h3>
        </div>
    )
}
export default Maps