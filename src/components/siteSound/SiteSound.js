import React, { useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import Modal from "../modal/Modal";
import { putSiteSound } from "../utils/api";
import { playAudio } from "../utils/play";
import * as S from "./style/SiteSoundStyle";

const SiteSound = ({ siteSoundItem, audioList, onRemove, refresh }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [inputs, setInputs] = useState({
    urls: siteSoundItem.url,
    fileId: siteSoundItem.file_id,
    title: siteSoundItem.title,
    copyUrl: siteSoundItem.url,
  });

  const { urls, fileId, title, copyUrl } = inputs;

  const handleTitle = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setInputs({
      ...inputs,
      title: e.target.value,
      fileId: e.target.options[selectedIndex].getAttribute("data-key"),
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onModalSave = () => {
    setModalIsOpen(false);
    setInputs({
      ...inputs,
      copyUrl: urls,
    });
  };

  const onReset = () => {
    setInputs({
      urls: siteSoundItem.url,
      fileId: siteSoundItem.file_id,
      title: siteSoundItem.title,
      copyUrl: siteSoundItem.url,
    });
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

  return (
    <S.SiteSoundItem>
      <S.Urls>{urls}</S.Urls>
      <S.EditBtn onClick={() => setModalIsOpen(true)}>
        <img src="/images/edit.svg" alt="" />
      </S.EditBtn>

      {modalIsOpen ? (
        <Modal urls={urls} onChange={onChange} onSave={onModalSave}></Modal>
      ) : null}

      {deleteModalIsOpen ? (
        <DeleteModal
          onClose={() => {
            setDeleteModalIsOpen(false);
          }}
          onRemove={() => {
            onRemove(siteSoundItem.id);
          }}
        ></DeleteModal>
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
          <S.DefaultBtn onClick={onReset}>
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
              <S.HoverImg src="/images/yotube_icon.png" alt="" />
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
