/*global chrome*/

import React from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  background: none;
  border: none;
  padding: 3px 3px 0px 0px;
  box-sizing: border-box;
  /* position: relative; */
  /* left: 440px; */
`;

const HoverImage = styled.img`
  border-radius: 10px;
  transition: all ease 1s;
  &:hover {
    background-color: lightgray;
    transform: rotate(360deg);
  }
`;

const HeadsetBtn = (fileLocation) => {
    
  const playSound = () => {
    let url = chrome.runtime.getURL("/audio/audio.html");
    // set this string dynamically in your code, this is just an example
    // this will play success.wav at half the volume and close the popup after a second
    url += `?volume=100&src=${fileLocation.fileLocation}&length=5000`;

    chrome.windows.create({
      type: "popup",
      focused: false,
      top: 1,
      left: 1928,
      height: 1,
      width: 1,
      url,
    });
  };

  return (
    <>
      <StyledBtn onClick={playSound}>
        <HoverImage src="/images/headphone.svg" />
      </StyledBtn>
    </>
  );
};

export default HeadsetBtn;
