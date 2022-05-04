/*global chrome*/

import React, { useState } from "react";
import styled from "styled-components";
import DeleteModal from "./DeleteModal";
import Modal from "./Modal";

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

const SiteSound = ({ SiteSoundItem, onRemove }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const onClose = () => {
    setModalIsOpen(false);
  };

  const showDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const playSound = () => {
    let url = chrome.runtime.getURL("/audio/audio.html");

    // set this string dynamically in your code, this is just an example
    // this will play success.wav at half the volume and close the popup after a second
    url += `?volume=1&src=${SiteSoundItem.file_location}&length=5000`;

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
    <StyledSsItem>
      <UrlSpan>{SiteSoundItem.url}</UrlSpan>
      <IconZoomIn onClick={() => setModalIsOpen(true)}>
        <img src="/images/edit.svg" alt="" />
      </IconZoomIn>
      {modalIsOpen ? (
        <Modal urls={SiteSoundItem.url} onClose={onClose}></Modal>
      ) : null}
      {deleteModalIsOpen ? (
        <DeleteModal
          onClose={() => {
            setDeleteModalIsOpen(false);
          }}
        ></DeleteModal>
      ) : null}

      <SelectSound defaultValue="1" name="audiofiles" id="audiofiles">
        <option value="1">{SiteSoundItem.file_name}</option>
      </SelectSound>

      <Btns>
        <StyledBtn
          onClick={() => {
            playSound(SiteSoundItem.file_location);
          }}
        >
          <HoverImage src="/images/headphone.svg" alt="" />
        </StyledBtn>
        <StyledBtn onClick={showDeleteModal}>
          <HoverImage src="/images/delete.svg" alt="" />
        </StyledBtn>
      </Btns>
    </StyledSsItem>
  );
};

export default SiteSound;
