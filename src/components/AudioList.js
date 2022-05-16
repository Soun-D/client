import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { deleteAudioFile, postMp3 } from "./api";
import HeadsetBtn from "./HeadsetBtn";

const AudioContainer = styled.div`
  width: 100%;
  position: relative;
`;

const AudioItem = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 558px;
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

const FileName = styled.b`
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
  // const [audioFileList, setAudioFileList] = useState(audioList);
  const [file, setFile] = useState();

  const fileInput = useRef();

  const onRemove = (audioFileId) => {
    deleteAudioFile(audioFileId, email)
      .then(() => {
        // setAudioFileList(
        //   audioFileList.filter((audioFile) => audioFile.id !== audioFileId)
        // );
        refresh();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("연결된 URL이 있으므로 삭제할 수 없다.");
        } else if (error.response.status === 404) {
          alert("file id 404");
        } else {
          console.log(error);
        }
      });
  };

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
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
          alert("file is empty");
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
            <FileName>{audio.file_name}</FileName>
            <HeadsetBtn fileLocation={audio.file_location}></HeadsetBtn>
            <CancelBtn onClick={() => onRemove(audio.id)}>
              <HoverImage src="/images/x.svg" alt="" />
            </CancelBtn>
          </AudioItem>
        );
      })}
      <InputFile
        type="file"
        onChange={handleFileInput}
        ref={fileInput}
      ></InputFile>
      <PlusBtn onClick={handleFilePost}>
        <img src="/images/add_icon.svg"></img>
      </PlusBtn>
    </AudioContainer>
  );
};

export default AudioList;
