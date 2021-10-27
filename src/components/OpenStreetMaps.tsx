// https://zenn.dev/tris/articles/2021-10-react-leaflet-ts-gsi
// https://www.ipride.co.jp/blog/3425

import {LatLng} from "leaflet";
import {Circle, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {useSelector} from "react-redux";
import {getGSetting, getGSignalingStatus} from "../store/selector";
import {UserInfo} from "../types/domain";

// NOTE: marker setting
let DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

const OpenStreetMaps = () => {
    //const position = new LatLng(51.505, -0.09)
    // ラジアンから経度緯度へ
    //const position = new LatLng(35.943250 * Math.PI / 180, 139.621090 * Math.PI / 180)

    const {surroundingUserList, userInfo: {geoLocation}} = useSelector(getGSignalingStatus)

    const Markers = surroundingUserList.map((userInfo: UserInfo) => {
        return <Marker key={userInfo.userID} position={new LatLng(userInfo.geoLocation.latitude, userInfo.geoLocation.longitude)}/>
    })

    const position = new LatLng(geoLocation.latitude, geoLocation.longitude)
    return (
        <MapContainer center={position} zoom={15} style={{height: '80vh'}}>
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle center={position} radius={100}/>
            {Markers}
            <Marker position={position}>
                <Popup>
                    aaaaaa
                </Popup>
            </Marker>
        </MapContainer>
    )
}
export default OpenStreetMaps