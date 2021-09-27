import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

import {getGSignalingStatus} from '../selector'
import {useSelector} from "react-redux";

const APIKEY = "";
const Maps = (g: any) => {
    const {surroundingUserList} = useSelector(getGSignalingStatus)

    const defaultGeoLocation = {
        position: {
            lat: 35.70225890,
            lng: 139.77447330
        },
        zoom: 10
    }

    return (
        <div style={{height: '100vh', width: "100%"}}>
            <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultGeoLocation.position}
                            defaultZoom={defaultGeoLocation.zoom}>
                {surroundingUserList.map((userInfo) => {
                    console.log("here!!!")
                    console.log(userInfo)
                    return <Marker lat={userInfo.geoLocation.lat} lng={userInfo.geoLocation.lng} color="yellow"/>
                })}
                <Marker lat={35.9432136} lng={139.621288} text="My Marker" color="red"/>
                <Marker lat={35.943207099999995} lng={139.6211672} text="My Marker" color="blue"/>
                <Marker lat={g.g.lat} lng={g.g.lng} text="My Marker" color="green"/>
                {console.log(g)}
            </GoogleMapReact>
        </div>
    )
}
export default Maps