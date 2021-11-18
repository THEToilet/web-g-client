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
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";

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

    // https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4
    const Mark = styled.div`
      position: absolute;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 18px;
      background-color: #000;
      border: 2px solid #fff;
      border-radius: 100%;
      user-select: none;
      transform: translate(-50%, -50%);

      &:hover {
        z-index: 1;
      }

    `;

    const {surroundingUserList, userInfo: {geoLocation}} = useSelector(getGSignalingStatus)

    const Markers = surroundingUserList.map((userInfo: UserInfo) => {
        return <OpenMarker key={userInfo.userID}
                           position={new LatLng(userInfo.geoLocation.latitude, userInfo.geoLocation.longitude)}
                           userInfo={userInfo} connect={props.connect}/>
    })

    const position = new LatLng(geoLocation.latitude, geoLocation.longitude)

    const [update, setUpdate] = useState<Boolean>(false)


    // REFERENCE: https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes
    function ChangeView(center: any, zoom: any) {
        const map = useMap();
        // XXX: center.centerとは。。。
        // NOTE: center.center center.zoomみたいになっている
        //map.setView(center.center, map.getZoom())
        if (update) {
            map.setView([geoLocation.latitude, geoLocation.longitude], 18)
            setUpdate(false)
        }
        return null
    }

    const updateMap = () => {
        setUpdate(true)
    }

    return (
        <>
            <MapContainer center={position} zoom={18} style={{height: '80vh'}}>
                <ChangeView center={position} zoom={18}/>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle center={position} radius={100000}/>
                {/* 他の端末 */}
                {Markers}
                {/* 自端末 */}
                <OpenMarker position={position} userInfo={userInfo} connect={props.connect}/>
            </MapContainer>
            <button onClick={updateMap}>UpdateMap</button>
        </>
    )
}
export default OpenStreetMaps