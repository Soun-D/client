import React, { useState } from "react";
import * as S from "./style/style";
import { playAudio } from "../utils/play";
import { putYoutube } from "../utils/api";

const YoutubeItem = ({ youtube, onRemove, refresh }) => {
  const [inputs, setInputs] = useState({
    id: youtube.id,
    title: youtube.title,
    play_time: Number(youtube.play_time),
    visible: youtube.visible,
    src: youtube.src,
    is_youtube: youtube.is_youtube,
  });

  const { id, title, play_time, visible, src } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs({
      id: youtube.id,
      title: youtube.title,
      play_time: youtube.play_time,
      visible: youtube.visible,
      src: youtube.src,
      is_youtube: youtube.is_youtube,
    });
  };

  const onVisible = (e) => {
    setInputs({
      ...inputs,
      visible: e.target.checked,
    });
  };

  const onSave = () => {
    if (title.replace(/ /g, "") && play_time < 301) {
      putYoutube(inputs)
        .then(() => {
          refresh();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert();
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

  const ObjCompare = (obj1, obj2) => {
    const Obj1_keys = Object.keys(obj1);
    const Obj2_keys = Object.keys(obj2);
    if (Obj1_keys.length !== Obj2_keys.length) {
      return false;
    }
    for (let k of Obj1_keys) {
      if (obj1[k] != obj2[k]) {
        return false;
      }
    }
    return true;
  };

  return (
    <S.YoutubeItem key={id}>
      <S.TitleInput
        type="text"
        name="title"
        value={title}
        onChange={onChange}
      />
      <S.CloseTimeInput
        type="number"
        name="play_time"
        min="1"
        max="300"
        checked
        value={play_time}
        onChange={onChange}
      />
      초 <span>Visible</span>
      <S.VisibleInput
        checked={visible}
        name="visible"
        type="checkbox"
        onChange={onVisible}
      />
      <S.StyledBtn
        onClick={() => playAudio("youtube", src, play_time, visible)}
      >
        <S.HoverImg src="/images/yotube_icon.png" alt="" />
      </S.StyledBtn>
      {ObjCompare(inputs, youtube) ? (
        <S.Btns>
          <S.StyledBtn onClick={() => onRemove(id)}>
            <S.HoverImg src="/images/x.svg" alt="" />
          </S.StyledBtn>
        </S.Btns>
      ) : (
        <S.Btns>
          <S.StyledBtn onClick={onSave}>
            <S.HoverImg src="/images/save.svg" alt="" />
          </S.StyledBtn>
          <S.StyledBtn onClick={onReset}>
            <S.HoverImg src="/images/취소.svg" alt="" />
          </S.StyledBtn>
        </S.Btns>
      )}
    </S.YoutubeItem>
  );
};

export default YoutubeItem;
