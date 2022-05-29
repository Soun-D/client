import React, { useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import Modal from "../modal/Modal";
import { putSiteSound } from "../utils/api";
import { playAudio } from "../utils/play";
import * as S from "./style/SiteSoundStyle";

const SiteSound = ({ siteSoundItem, audioList, onRemove, refresh }) => {
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
    if (e.target.value !== copyUrl) setUrls(e.target.value);
  };

  const sayYesOrNo = (choice) => {
    setDeleteModalIsOpen(false);
    if (choice) onRemove(siteSoundItem.id);
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
    <S.SiteSoundItem>
      <S.Urls>{urls}</S.Urls>
      <S.EditBtn onClick={() => setModalIsOpen(true)}>
        <img src="/images/edit.svg" alt="" />
      </S.EditBtn>

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

      <S.AudioSelect value={title} name="audioList" onChange={handleTitle}>
        {audioList.map((audio) => (
          <option key={audio.id} value={audio.title} data-key={audio.id}>
            {audio.is_youtube ? audio.title + "⏩" : audio.title}
          </option>
        ))}
      </S.AudioSelect>

      {copyUrl !== siteSoundItem.url || fileId !== siteSoundItem.file_id ? (
        <div>
          <S.DefaultBtn onClick={onSave}>
            <S.HoverImg src="/images/save.svg" alt="" />
          </S.DefaultBtn>
          <S.DefaultBtn onClick={onCancel}>
            <S.HoverImg src="/images/취소.svg" alt="" />
          </S.DefaultBtn>
        </div>
      ) : (
        <div>
          {siteSoundItem.is_youtube ? (
            <S.PlayBtn
              onClick={() => {
                playAudio(
                  "youtube",
                  siteSoundItem.src,
                  siteSoundItem.play_time
                );
              }}
            >
              <img src="/images/yotube_icon.png" alt="" />
            </S.PlayBtn>
          ) : (
            <S.DefaultBtn
              onClick={() => {
                playAudio("audio", siteSoundItem.src, siteSoundItem.play_time);
              }}
            >
              <S.HoverImg src="/images/headphone.svg" />
            </S.DefaultBtn>
          )}
          <S.DefaultBtn onClick={() => setDeleteModalIsOpen(true)}>
            <S.HoverImg src="/images/delete.svg" alt="" />
          </S.DefaultBtn>
        </div>
      )}
    </S.SiteSoundItem>
  );
};

export default SiteSound;
