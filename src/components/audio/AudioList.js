import React, { useRef, useState } from "react";
import styled from "styled-components";
import { deleteAudioFile, postMp3 } from '../utils/api';
import HeadsetBtn from '../utils/HeadsetBtn';

const AudioContainer = styled.div`
  width: 100%;
  position: relative;
`;

const AudioItem = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid black;
`;

const CancelBtn = styled.button`
  background: none;
  border: none;
  padding: 3px 3px 0px 0px;
  box-sizing: border-box;
  left: 500px;
  position: absolute;
`;

const HoverImage = styled.img`
  border-radius: 10px;
  transition: all ease 1s;
  &:hover {
    background-color: lightgray;
    transform: rotate(360deg);
  }
`;

const TitleB = styled.b`
  margin-right: 10px;
`;

const PlusBtn = styled.button`
  position: absolute;
  width: 50%;
  height: 40px;
  bottom: 0;
  left: 240px;
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 20px;
  border: 1px solid black;
  border-radius: 20px;
  margin: 0px 0px 1px 38px;
  cursor: pointer;
`;

const InputFile = styled.input`
  position: absolute;
  bottom: 0;
`;

const AudioList = ({ audioList, email, refresh }) => {
  const [file, setFile] = useState();

  const fileInput = useRef();

  const onRemove = (audioFileId) => {
    deleteAudioFile(audioFileId, email)
      .then(() => refresh())
      .catch((error) => {
        if (error.response.status === 400) {
          alert("연결된 URL이 있으므로 삭제할 수 없습니다");
        } else if (error.response.status === 404) {
          alert("file id 404");
        } else {
          console.log(error);
        }
      });
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert("5MB 이하로 파일을 업로드 해주세요");
      setFile(null);
      e.target.value = "";
    } else if (!/\.(mp3|m4a)$/i.test(file.name)) {
      alert("mp3, m4a 파일만 선택해 주세요.\n\n현재 파일 : " + file.name);
      e.target.value = "";
    } else {
      setFile(file);
    }
  };

  const handleFilePost = () => {
    const formData = new FormData();
    formData.append("mp3", file);
    formData.append(
      "email",
      new Blob(
        [
          JSON.stringify({
            email: email,
            play_time: 10000
          }),
        ],
        { type: "application/json" }
      )
    );

    postMp3(formData)
      .then(() => {
        refresh();
        fileInput.current.value = "";
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("400: Bad Request.");
        } else if (error.response.status === 409) {
          alert("동일한 이름의 파일이 이미 존재합니다. \n");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <AudioContainer>
      {audioList.map((audio) => {
        return (
          <AudioItem key={audio.id}>
            <TitleB>{audio.title}</TitleB>
            <HeadsetBtn src={audio.src} len={audio.play_time}></HeadsetBtn>
            <CancelBtn onClick={() => onRemove(audio.id)}>
              <HoverImage src="/images/x.svg" alt="" />
            </CancelBtn>
          </AudioItem>
        );
      })}
      <InputFile
        type="file"
        accept=".mp3, .m4a"
        onChange={handleFileInput}
        ref={fileInput}
      ></InputFile>
      <PlusBtn onClick={handleFilePost}>
        <img src="/images/add_icon.svg" alt=""></img>
      </PlusBtn>
    </AudioContainer>
  );
};

export default AudioList;
