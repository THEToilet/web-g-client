import {Popup, Marker} from "react-leaflet";
import PopupInfo from "./PopupInfo";

/*
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
 */

/*<div><Pin style={{backgroundColor:color}} title={name}/><Pulse/></div>*/
const OpenMarker = (props: any) => {
    const {name} = props
    return (
        <Marker position={props.position}
                title={name}>
            {/*console.log(props.userInfo)*/}
            <Popup>
                {props.userInfo !== undefined && (
                    <PopupInfo userInfo={props.userInfo} connect={props.connect}/>
                )
                }
            </Popup>
        </Marker>
    )
}
export default OpenMarker