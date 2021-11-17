// https://zenn.dev/tris/articles/2021-10-react-leaflet-ts-gsi
// https://www.ipride.co.jp/blog/3425

import {LatLng} from "leaflet";
import {Circle, MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {useSelector} from "react-redux";
import {getGSignalingStatus} from "../store/selector";
import {UserInfo} from "../types/domain";
import OpenMarker from "./OpenMarker";
import {userInfo} from "os";

// NOTE: marker setting
let DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

const OpenStreetMaps = (props: any) => {
    //const position = new LatLng(51.505, -0.09)
    // ラジアンから経度緯度へ
    //const position = new LatLng(35.943250 * Math.PI / 180, 139.621090 * Math.PI / 180)

    const {surroundingUserList, userInfo: {geoLocation}} = useSelector(getGSignalingStatus)

    const Markers = surroundingUserList.map((userInfo: UserInfo) => {
        return <OpenMarker key={userInfo.userID}
                           position={new LatLng(userInfo.geoLocation.latitude, userInfo.geoLocation.longitude)}
                           userInfo={userInfo} connect={props.connect}/>
    })

    const position = new LatLng(geoLocation.latitude, geoLocation.longitude)

    // REFERENCE: https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes
    function ChangeView(center: any, zoom: any) {
        const map = useMap();
        // XXX: center.centerとは。。。
        // NOTE: center.center center.zoomみたいになっている
        //map.setView(center.center, map.getZoom())
        map.setView([35.943250, 139.621090], map.getZoom())
        return null
    }

    return (
        <>
            <MapContainer center={position} zoom={18} style={{height: '80vh'}}>
                <ChangeView center={position} zoom={18}/>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle center={position} radius={100}/>
                {/* 他の端末 */}
                {Markers}
                {/* 自端末 */}
                <OpenMarker position={position} userInfo={userInfo} connect={props.connect}/>
            </MapContainer>
        </>
    )
}
export default OpenStreetMaps