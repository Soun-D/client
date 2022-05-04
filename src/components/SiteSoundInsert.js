import React, { useState } from "react";
import styled from "styled-components";
import Modal from './Modal';
import axios from "axios";

const StyledSsItem = styled.li`
  list-style: none;
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 51px;
  width: 100%;
  padding: 0px 0px 0px 10px;
`;

const StyledBtn = styled.button`
  background: none;
  border: none;
  padding: 3px 3px 0px 0px;
  box-sizing: border-box;
`;

const SelectSound = styled.select`
  position: absolute;
  bottom: 15px;
  left: 225px;
  width: 187px;
  height: 20px;
`;

const Btns = styled.div`
  display: flex;
`;

const IconZoomIn = styled(StyledBtn)`
  position: absolute;
  bottom: 9px;
  left: 195px;
  border: solid 1px black;
  padding: 1px;
`;

const HoverImage = styled.img`
  border-radius: 10px;
  transition: all ease 1s;
  &:hover {
    background-color: lightgray;
    transform: rotate(360deg);
  }
`;

const UrlSpan = styled.span`
  word-break: break-all;
  width: 177px;
  height: 40;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid black;
`;

const SiteSoundInsert = ({ onRemove }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [urls, setUrls] = useState("");

  const saveSiteSound = () => {};

  return (
    <StyledSsItem>
      <UrlSpan>{urls}</UrlSpan>
      <IconZoomIn onClick={() => setModalIsOpen(true)}>
        <img src="/images/edit.svg" alt="" />
      </IconZoomIn>
      {modalIsOpen ? <Modal setUrls={setUrls} onClose={() => {setModalIsOpen(false)}}></Modal> : null}
      <SelectSound defaultValue="" name="audiofiles" id="audiofiles">
        <option value="1"></option>
      </SelectSound>
      <Btns>
        <StyledBtn onClick={saveSiteSound}>
          <HoverImage src="/images/save.svg" alt="" />
        </StyledBtn>
        <StyledBtn onClick={onRemove}>
          <HoverImage src="/images/x.svg" alt="" />
        </StyledBtn>
      </Btns>
    </StyledSsItem>
  );
};

export default SiteSoundInsert;
