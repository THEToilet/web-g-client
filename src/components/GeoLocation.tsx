import GoogleMapReact from "google-map-react";
import {GeoLocation} from '../types/domain'
import Marker from "./Marker";

const APIKEY = "";
const G = (geoLocation: any) => {

    /*
    const handleApiLoaded = (map: any, maps: any | null) => {
        const bounds = new maps.LatLngBounds();
        const marker = new maps.Marker({
            map,
            position: geoLocation
        })
        bounds.extend(marker.position)
        map.fitBounds(bounds)
    }
     */

    const defaultGeoLocation = {
        position: {
            lat: 35.70225890,
            lng: 139.77447330
        },
        zoom: 10
    }
    /* <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultGeoLocation.position} defaultZoom={defaultGeoLocation.zoom} onGoogleApiLoaded={handleApiLoaded}>*/
    return (
        <div style={{height: '100vh', width: "100%"}}>
            <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultGeoLocation.position}
                            defaultZoom={defaultGeoLocation.zoom}>
                <Marker lat={geoLocation.lat} lng={geoLocation.lng} text="My Marker" color="blue"/>
                <Marker lat={35.9432136} lng={139.621288} text="My Marker" color="red"/>
                {console.log(geoLocation)}
                {/*<Marker lat={defaultGeoLocation.position.lat} lng={defaultGeoLocation.position.lng} text="My Marker" color="red"/>*/}
            </GoogleMapReact>
        </div>
    )
}
export default G