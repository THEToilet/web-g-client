import React from "react";
import styled from "styled-components";

// https://codesandbox.io/embed/google-maps-react-9slxw?fontsize=14&hidenavigation=1&theme=dark:w

const BalloonWindow = styled.div`
  background: #ffffff;
  width: 200px;
  height: 150px;
  position: absolute;
  top: -200px;
  left: 0px;
  transform: translate(-50%);
  border-radius: 10px;

  :after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: -24px;
    display: block;
    width: 0;
    height: 0;
    margin: 0 auto;
    border-style: solid;
    border-width: 25px 25px 0 25px;
    border-color: #ffffff transparent transparent transparent;
  }
`;

const BalloonText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 12pt
`;

// TODO : 型変える

const Balloon = (props: any) => {
    return (
        <BalloonWindow className={"scrollWindow"}>
            <BalloonText>{"userID: " + props.userInfo.userID + "\nlat: " + props.userInfo.latitude + "\nlng: " + props.userInfo.longitude}</BalloonText>
        </BalloonWindow>
    );
};

export default Balloon;