import React, { useCallback, useEffect, useRef, useState } from "react";
import { deleteAudioFile, getAudioList, postAudio } from "../utils/api";
import { playAudio } from "../utils/play";
import Spinner from "../utils/Spinner";
import * as S from "./style/style";

const AudioList = ({ email, isPlaying, setIsPlaying }) => {
  const [file, setFile] = useState();
  const [audioList, setAudioList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInput = useRef();

  const setData = useCallback(async () => {
    try {
      setIsLoading(true);
      const audioRes = await getAudioList(email);
      setAudioList(audioRes.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [email]);

  useEffect(() => {
    setData();
  }, [setData]);

  const onRemove = (audioFileId) => {
    deleteAudioFile(audioFileId, email)
      .then(() => setData())
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
            play_time: 10,
          }),
        ],
        { type: "application/json" }
      )
    );

    postAudio(formData)
      .then(() => {
        setData();
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
    <S.AudioContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        audioList.map((audio) => {
          return (
            <S.AudioItem key={audio.id}>
              <S.Title>{audio.title}</S.Title>
              <S.StyledBtn
                onClick={() => {
                  if (!isPlaying) {
                    playAudio("audio", audio.src, audio.play_time);
                    setIsPlaying(true);
                    setTimeout(
                      () => setIsPlaying(false),
                      audio.play_time * 1000
                    );
                  }
                }}
              >
                <S.HoverImage src="/images/headphone.svg" />
              </S.StyledBtn>
              <S.CancelBtn onClick={() => onRemove(audio.id)}>
                <S.HoverImage src="/images/x.svg" alt="" />
              </S.CancelBtn>
            </S.AudioItem>
          );
        })
      )}
      <S.InputFile
        type="file"
        accept=".mp3, .m4a"
        onChange={handleFileInput}
        ref={fileInput}
      ></S.InputFile>
      <S.PlusBtn onClick={handleFilePost}>
        <img src="/images/add_icon.svg" alt=""></img>
      </S.PlusBtn>
    </S.AudioContainer>
  );
};

export default AudioList;
