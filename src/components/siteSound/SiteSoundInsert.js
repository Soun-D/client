import React, { useState } from "react";
import * as S from "./style/SiteSoundStyle";
import Modal from "../modal/Modal";
import { postSiteSound } from "../utils/api";


const SiteSoundInsert = ({ onRemove, audioList, refresh }) => {
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
    <S.NewSiteSound>
      <S.Urls>{urls}</S.Urls>
      <S.EditBtn onClick={() => setModalIsOpen(true)}>
        <img src="/images/edit.svg" alt="" />
      </S.EditBtn>
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
      <S.AudioSelect defaultValue="" name="audioList" onChange={handleSelect}>
        {audioList.map((audio) => (
          <option key={audio.id} value={audio.title} data-key={audio.id}>
            {audio.is_youtube ? audio.title + "⏩" : audio.title}
          </option>
        ))}
      </S.AudioSelect>
      <div>
        <S.DefaultBtn onClick={saveSiteSound}>
          <S.HoverImg src="/images/save.svg" alt="" />
        </S.DefaultBtn>
        <S.DefaultBtn onClick={onRemove}>
          <S.HoverImg src="/images/delete.svg" alt="" />
        </S.DefaultBtn>
      </div>
    </S.NewSiteSound>
  );
};

export default SiteSoundInsert;
