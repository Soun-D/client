import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { postSiteSound } from "./api";

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

  const handleSelect = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setFileId(e.target.options[selectedIndex].getAttribute("data-key"));
  };

  const onUrlChange = (e) => {
    if (e.target.value.length > 2000) {
      alert("최대 2000자 까지 입력할 수 있습니다!");
      setUrls(e.target.value.substr(0, 2000));
      console.log(e.target.value.substr(0, 2000));
    } else {
      setUrls(e.target.value);
    }
  };

  const saveSiteSound = () => {
    if (!urls.replace(/ /g, "")) {
      alert("URL 입력란을 채워주세요");
      return;
    } else if (!fileId) {
      alert("오디오 파일을 업로드하거나 목록에서 선택해주세요");
      return;
    }
    postSiteSound({
      url: urls,
      audio_file_id: fileId,
    })
      .then(() => {
        refresh();
        onRemove();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("URL 형식을 맞춰주세요");
          console.log(error);
        } else if (error.response.status === 409) {
          alert("중복된 URL이 존재합니다!");
        } else {
          console.log(error);
        }
      });
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
            setUrls("");
          }}
          onSave={() => {
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
