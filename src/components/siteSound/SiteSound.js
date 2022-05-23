import React, { useState } from "react";
import styled from "styled-components";
import DeleteModal from "./DeleteModal";
import Modal from "./Modal";
import { putSiteSound } from "../utils/api";
import HeadsetBtn from "../utils/HeadsetBtn";

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

const SiteSound = ({ siteSoundItem, audioFiles, onRemove, refresh }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [urls, setUrls] = useState(siteSoundItem.url);
  const [fileId, setFileId] = useState(siteSoundItem.file_id);
  const [title, setTitle] = useState(siteSoundItem.title);

  const [copyUrl, setCopyUrl] = useState(siteSoundItem.url);

  const handleTitle = (e) => {
    setTitle(e.target.value);
    const selectedIndex = e.target.options.selectedIndex;
    setFileId(e.target.options[selectedIndex].getAttribute("data-key"));
  };

  const onUrlChange = (e) => {
    if (e.target.value !== copyUrl)
      setUrls(e.target.value);
  };

  const sayYesOrNo = (choice) => {
    setDeleteModalIsOpen(false);
    if (choice) {
      onRemove(siteSoundItem.id);
    }
  };

  const onModalSave = () => {
    setCopyUrl(urls);
    setModalIsOpen(false);
  };

  const onClickBackground = () => {
    setModalIsOpen(false);
    setUrls(copyUrl);
  };

  const onSave = () => {
    if (!urls.replace(/ /g, "")) {
      alert("URL 입력란을 채워주세요");
      return;
    }
    putSiteSound({
      id: siteSoundItem.id,
      url: urls,
      audio_file_id: fileId,
    })
      .then(() => refresh())
      .catch((error) => {
        if (error.response.status === 409) {
          alert("중복된 URL이 있습니다!");
        } else if (error.response.status === 400) {
          alert("URL형식을 맞춰주세요!");
        } else {
          console.log(error);
        }
      });
  };

  const onCancel = () => {
    setCopyUrl(siteSoundItem.url);
    setUrls(siteSoundItem.url);
    setFileId(siteSoundItem.file_id);
    setTitle(siteSoundItem.title);
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
          onSave={onModalSave}
        ></Modal>
      ) : null}

      {deleteModalIsOpen ? (
        <DeleteModal sayYesOrNo={sayYesOrNo}></DeleteModal>
      ) : null}

      <SelectSound value={title} name="audiofiles" onChange={handleTitle}>
        {audioFiles.map((audioFile) => (
          <option
            key={audioFile.id}
            value={audioFile.title}
            data-key={audioFile.id}
          >
            {audioFile.title}
          </option>
        ))}
      </SelectSound>

      {copyUrl !== siteSoundItem.url || fileId !== siteSoundItem.file_id ? (
        <Btns>
          <StyledBtn onClick={onSave}>
            <HoverImage src="/images/save.svg" alt="" />
          </StyledBtn>
          <StyledBtn onClick={onCancel}>
            <HoverImage src="/images/취소.svg" alt="" />
          </StyledBtn>
        </Btns>
      ) : (
        <Btns>
          <HeadsetBtn src={siteSoundItem.src} len={10000}></HeadsetBtn>
          <StyledBtn onClick={() => setDeleteModalIsOpen(true)}>
            <HoverImage src="/images/delete.svg" alt="" />
          </StyledBtn>
        </Btns>
      )}
    </StyledSsItem>
  );
};

export default SiteSound;
