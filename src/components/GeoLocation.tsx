import {useState} from "react";

const [position, setPosition] = useState({latitude: String, longitude: String});

const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords)
    })
}

const GeoLocation = () => {
    return (<div>
        {getCurrentPosition}
    </div>);
};
export default GeoLocation;