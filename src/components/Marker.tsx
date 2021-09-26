import styled from "styled-components";

// https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4
const Pin = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: #00ff00;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;

  :after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #e6e6e6;
    position: absolute;
    border-radius: 50%;
  }
`;

const Pulse = styled.div`
  background: #d6d4d4;
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 11px 0px 0px -12px;
  transform: rotateX(55deg);
  z-index: -2;

  :after {
    content: "";
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -13px;
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-shadow: 0 0 1px 2px #00cae9;
    animation-delay: 1.1s;
  }
`;
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
    const {color, name, id} = props
    return (
        <Mark style={{backgroundColor: color, cursor: 'pointer'}}
              title={name}/>
    )
}
export default Marker