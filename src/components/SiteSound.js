/*global chrome*/

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DeleteModal from "./DeleteModal";
import Modal from "./Modal";
import { putSiteSound } from "./api";
import HeadsetBtn from "./HeadsetBtn";

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

const SiteSound = ({ siteSoundItem, audioFiles, onRemove }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [isUrlChange, setIsUrlChange] = useState(false);
  const [isFileChange, setIsFileChange] = useState(false);

  const [urls, setUrls] = useState("");
  const [fileId, setFileId] = useState("");
  const [filename, setFilename] = useState("");
  const [fileLocation, setFileLocation] = useState("");

  const [copyUrl, setCopyUrl] = useState(siteSoundItem.url);

  useEffect(() => {
    setUrls(siteSoundItem.url);
    setFilename(siteSoundItem.file_name);
    setFileId(siteSoundItem.file_id);
    setFileLocation(siteSoundItem.file_location);
  }, []);

  const handleFilename = (e) => {
    setFilename(e.target.value);
    const selectedIndex = e.target.options.selectedIndex;
    const fileIndex = e.target.options[selectedIndex].getAttribute("data-key");
    const src = e.target.options[selectedIndex].getAttribute("src");

    if (siteSoundItem.file_id != fileIndex) {
      console.log(siteSoundItem.file_id, fileIndex, selectedIndex);
      setIsFileChange(true);
      setFileId(fileIndex);
      setFileLocation(src);
      console.log(src);
    } else {
      setIsFileChange(false);
    }
  };

  const onUrlChange = (e) => {
    console.log(copyUrl);
    if (e.target.value !== siteSoundItem.url) {
      setUrls(e.target.value);
      setIsUrlChange(true);
    } else {
      setIsUrlChange(false);
    }
  };

  const checkUrlChange = () => {
    if (copyUrl !== siteSoundItem.url) {
      setIsUrlChange(true);
    } else {
      setIsUrlChange(false);
    }
  };

  const updateSiteSound = () => {
    if (!urls.replace(/ /g, "")) {
      alert("url is empty");
      return;
    }
    putSiteSound({
      id: siteSoundItem.id,
      url: urls,
      audio_file_id: fileId,
    })
      .then(() => {
        setIsUrlChange(false);
        setIsFileChange(false);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("중복된 URL이 있다.");
        } else if (error.response.status === 400) {
          alert("URL형식을 지키길 바란다.");
        } else {
          console.log(console.error());
        }
      });
  };

  const showDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const sayYesOrNo = (b) => {
    setDeleteModalIsOpen(false);
    if (b) onRemove(siteSoundItem.id);
  };

  const onClickBackground = () => {
    checkUrlChange();
    setModalIsOpen(false);
    setUrls(copyUrl);
  };

  const onCancel = () => {
    setIsUrlChange(false);
    setIsFileChange(false);
    setUrls(siteSoundItem.url);
    setFilename(siteSoundItem.file_name);
  };

  const onSave = () => {
    setCopyUrl(urls);
    console.log(copyUrl);
    setModalIsOpen(false);
  };

  return (
    <StyledSsItem>
      <UrlSpan>{urls}</UrlSpan>
      <IconZoomIn onClick={() => setModalIsOpen(true)}>
        <img src="/images/edit.svg" alt="" />
      </IconZoomIn>

      {modalIsOpen ? (
        <Modal
          urls={urls}
          onUrlChange={onUrlChange}
          onClose={onClickBackground}
          onSave={onSave}
        ></Modal>
      ) : null}

      {deleteModalIsOpen ? (
        <DeleteModal sayYesOrNo={sayYesOrNo}></DeleteModal>
      ) : null}

      <SelectSound value={filename} name="audiofiles" onChange={handleFilename}>
        {audioFiles.map((audioFile) => (
          <option
            key={audioFile.id}
            value={audioFile.file_name}
            data-key={audioFile.id}
            src={audioFile.file_location}
          >
            {audioFile.file_name}
          </option>
        ))}
      </SelectSound>

      {isUrlChange || isFileChange ? (
        <Btns>
          <StyledBtn onClick={updateSiteSound}>
            <HoverImage src="/images/save.svg" alt="" />
          </StyledBtn>
          <StyledBtn onClick={onCancel}>
            <HoverImage src="/images/취소.svg" alt="" />
          </StyledBtn>
        </Btns>
      ) : (
        <Btns>
          <HeadsetBtn fileLocation={siteSoundItem.file_location}></HeadsetBtn>
          <StyledBtn onClick={showDeleteModal}>
            <HoverImage src="/images/delete.svg" alt="" />
          </StyledBtn>
        </Btns>
      )}
    </StyledSsItem>
  );
};

export default SiteSound;
