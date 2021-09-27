import styled from "styled-components";
import {useState} from "react";
import Balloon from "./Balloon";

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


/*<div><Pin style={{backgroundColor:color}} title={name}/><Pulse/></div>*/
const Marker = (props: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const changeState = () => {
        setIsOpen(!isOpen);
    };
    const {color, name, id} = props
    return (
        <div onClick={changeState}>
            <Mark style={{backgroundColor: color, cursor: 'pointer'}}
                  title={name}/>
            {isOpen ? (
                <Balloon lat={props.lat} lng={props.lng} />
            ) : null }
        </div>
    )
}
export default Marker