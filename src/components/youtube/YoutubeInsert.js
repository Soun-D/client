import React, { useState } from "react";
import { postYoutube } from "../utils/api";
import Modal from "../modal/Modal";
import * as S from "./style/style";
import { playAudio } from '../utils/play';

const YoutubeInsert = ({ email, onRemove, refresh }) => {
  const [title, setTitle] = useState("");
  const [iframe, setIframe] = useState("");
  const [closeTime, setCloseTime] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const checkYoutubeIframe = (e) => {
    const template = document.createElement("template");
    const youtubeIframe = e.target.value.trim();
    template.innerHTML = youtubeIframe;
    let iframeTag = template.content.firstChild;

    if (iframeTag.hasAttribute("src")) {
      let iframeSrc = iframeTag.getAttribute("src");

      if (iframeSrc.includes("?start=")) {
        iframeTag.setAttribute("src", (iframeSrc += "&autoplay=1"));
      } else {
        iframeTag.setAttribute("src", (iframeSrc += "?autoplay=1"));
      }
      setIframe(iframeTag);
    } else {
      setIframe("");
    }
  };

  const onSaveYoutube = () => {
    if (title.replace(/ /g, "") && closeTime && iframe) {
      postYoutube({
        email: email,
        src: iframe.outerHTML,
        title: title,
        play_time: closeTime * 1000,
      })
        .then(() => {
          onRemove();
          refresh();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("400: Bad Request.");
          } else if (error.response.status === 409) {
            alert("동일한 이름의 유튜브가 이미 존재합니다. \n");
          } else {
            console.log(error);
          }
        });
    } else {
      alert("모든 값을 다 정확히 입력해주세요");
    }
  };

  return (
    <S.YoutubeItem>
      TITLE
      <S.IframeInput
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></S.IframeInput>
      Playtime
      <S.CloseTimeInput
        type="number"
        min={1}
        max="600"
        onChange={(e) => {
          setCloseTime(e.target.value * 1000);
        }}
      ></S.CloseTimeInput>
      {modalIsOpen ? (
        <Modal
          onUrlChange={checkYoutubeIframe}
          onClose={() => {
            setModalIsOpen(false);
            setIframe("");
          }}
          onSave={() => {
            setModalIsOpen(false);
          }}
          urls={iframe.outerHTML}
        ></Modal>
      ) : null}
      <S.Btns>
        <S.EditBtn onClick={() => setModalIsOpen(true)}>
          Iframe
          <S.HoverImage src="/images/edit.svg" alt="" />
        </S.EditBtn>
        <S.StyledBtn
          onClick={() => {
            playAudio("youtube", iframe, closeTime);
          }}
        >
          <S.HoverImage src="/images/playBtn.png" alt="" />
        </S.StyledBtn>
        <S.StyledBtn onClick={onSaveYoutube}>
          <S.HoverImage src="/images/save.svg" alt="" />
        </S.StyledBtn>
        <S.StyledBtn onClick={onRemove}>
          <S.HoverImage src="/images/x.svg" alt="" />
        </S.StyledBtn>
      </S.Btns>
    </S.YoutubeItem>
  );
};

export default YoutubeInsert;
