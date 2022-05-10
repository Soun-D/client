import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
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

const SiteSoundInsert = ({ onRemove, audioFiles, refresh }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fileId, setFileId] = useState("");
  const [urls, setUrls] = useState("");

  const host = "http://localhost:8080";

  const handleSelect = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setFileId(e.target.options[selectedIndex].getAttribute("data-key"));
  };

  const onUrlChange = (e) => {
    setUrls(e.target.value);
  };

  const saveSiteSound = () => {
    if (!urls.replace(/ /g, "")) {
      alert("url is empty");
      return;
    } else if (!fileId) {
      alert("fileId is empty");
      return;
    }
    axios.post(host + "/site-sound", {
      url: urls,
      audio_file_id: fileId,
    }).then(() => refresh());
    onRemove();
  };

  return (
    <StyledSsItem>
      <UrlSpan>{urls}</UrlSpan>
      <IconZoomIn onClick={() => setModalIsOpen(true)}>
        <img src="/images/edit.svg" alt="" />
      </IconZoomIn>
      {modalIsOpen ? (
        <Modal
          onUrlChange={onUrlChange}
          onClose={() => {
            setModalIsOpen(false);
          }}
          urls={urls}
        ></Modal>
      ) : null}
      <SelectSound defaultValue="" name="audiofiles" onChange={handleSelect}>
        <option disabled hidden value=""></option>
        {audioFiles.map((audioFile) => (
          <option
            key={audioFile.id}
            value={audioFile.file_name}
            data-key={audioFile.id}
          >
            {audioFile.file_name}
          </option>
        ))}
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
