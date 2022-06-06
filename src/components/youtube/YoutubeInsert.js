import React, { useState } from "react";
import { postYoutube } from "../utils/api";
import Modal from "../modal/Modal";
import * as S from "./style/style";
import { playAudio } from "../utils/play";

const YoutubeInsert = ({ email, onRemove, refresh }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [start, setStart] = useState("0");

  const [inputs, setInputs] = useState({
    title: "",
    iframe: "",
    closeTime: 0,
    visible: false,
  });

  const { title, iframe, closeTime, visible } = inputs;

  const checkYoutubeIframe = (e) => {
    const template = document.createElement("template");
    const youtubeIframe = e.target.value.trim();
    template.innerHTML = youtubeIframe;
    let iframeTag = template.content.firstChild;

    try {
      let iframeSrc = iframeTag.getAttribute("src");

      if (iframeSrc.includes("?start=")) {
        const strStart = iframeSrc.match(/\?start=[0-9]+/)["0"];
        setStart(strStart.match(/[0-9]+/)["0"]);
        iframeSrc = iframeSrc.replace(/\?start=[0-9]+/i, "");
      } else {
        setStart("0");
      }

      iframeSrc += "?autoplay=1";
      iframeTag.setAttribute("src", iframeSrc);

      setInputs({
        ...inputs,
        iframe: iframeTag,
      });
    } catch (error) {
      console.log(error);
      setInputs({
        ...inputs,
        iframe: "",
      });
      setStart("0");
    }
  };

  const onSaveYoutube = () => {
    if (title.replace(/ /g, "") && closeTime < 301 && iframe) {
      postYoutube({
        email: email,
        src: iframe.outerHTML,
        title: title,
        play_time: closeTime,
        visible: visible,
        start: start,
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
      alert("모든 값을 정확히 입력해주세요");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onVisible = (e) => {
    setInputs({
      ...inputs,
      visible: e.target.checked,
    });
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <S.YoutubeInsertItem>
      <div>
        <S.Inputs1>
          TITLE
          <S.TitleInput
            type="text"
            name="title"
            value={title}
            onChange={onChange}
          />
          Visible
          <S.VisibleInput name="visible" type="checkbox" onChange={onVisible} />
        </S.Inputs1>
        PlayTime (max: 300)
        <S.CloseTimeInput
          type="number"
          name="closeTime"
          min="1"
          max="300"
          checked
          value={closeTime}
          onChange={onChange}
        />
      </div>
      <S.InsertBtns>
        <S.EditBtn onClick={() => setModalIsOpen(true)}>
          Iframe
          <S.HoverImg src="/images/edit.svg" alt="" />
        </S.EditBtn>

        <S.StyledBtn
          disabled={!iframe}
          style={iframe ? {} : { backgroundColor: "gray" }}
          onClick={() => {
            playAudio("youtube", iframe.outerHTML, closeTime, visible, start);
          }}
        >
          <S.HoverImg src="/images/playBtn.svg" alt="" />
        </S.StyledBtn>

        <S.StyledBtn onClick={onSaveYoutube}>
          <S.HoverImg src="/images/save.svg" alt="" />
        </S.StyledBtn>

        <S.StyledBtn onClick={onRemove}>
          <S.HoverImg src="/images/x.svg" alt="" />
        </S.StyledBtn>
      </S.InsertBtns>

      {modalIsOpen ? (
        <Modal
          onChange={checkYoutubeIframe}
          onSave={onCloseModal}
          urls={iframe.outerHTML}
        />
      ) : null}
    </S.YoutubeInsertItem>
  );
};

export default YoutubeInsert;
