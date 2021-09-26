import GoogleMapReact from "google-map-react";
const APIKEY = "";
const GeoLocation = (geoLocation: any) => {

    const handleApiLoaded = (map: any, maps: any | null) => {
        const bounds = new maps.LatLngBounds();
        const marker = new maps.Marker({
            map,
            position: geoLocation
        })
        bounds.extend(marker.position)
        map.fitBounds(bounds)
    }

    const defaultGeoLocation = {
        position: {
            lat: 35.70225890,
            lng: 139.77447330
        },
        zoom: 10
    }
    return (
        <GoogleMapReact bootstrapURLKeys={{key: APIKEY}} defaultCenter={defaultGeoLocation.position}
                        defaultZoom={defaultGeoLocation.zoom} onGoogleApiLoaded={handleApiLoaded}/>
    )

}
export default GeoLocation