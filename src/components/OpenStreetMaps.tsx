// https://zenn.dev/tris/articles/2021-10-react-leaflet-ts-gsi
// https://www.ipride.co.jp/blog/3425

import {LatLng} from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// marker setting
let DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

const LeafletContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

const OpenStreetMaps = () => {
    //const position = new LatLng(51.505, -0.09)
    const position = new LatLng(34.673542, 135.43333)
    return (
        <LeafletContainer>
            <MapContainer center={position} zoom={13} style={{height: '80vh'}}>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        aaaaaa
                    </Popup>
                </Marker>

            </MapContainer>
        </LeafletContainer>
    )
}
export default OpenStreetMaps