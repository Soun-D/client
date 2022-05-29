import React, { useEffect, useState, useCallback } from "react";
import { deleteAudioFile, getYoutubeList } from "../utils/api";
import { playAudio } from "../utils/play";
import Spinner from "../utils/Spinner";
import YoutubeInsert from "./YoutubeInsert";
import * as S from "./style/style";

const YoutubeList = ({ email }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeList, setYoutubeList] = useState([]);

  const setData = useCallback(async () => {
    try {
      setIsLoading(true);
      const youtubeRes = await getYoutubeList(email);
      setYoutubeList(youtubeRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [email]);

  useEffect(() => {
    setData();
  }, [setData]);

  const onRemove = (youtubeId) => {
    deleteAudioFile(youtubeId, email)
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

  return (
    <S.AudioContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        youtubeList.map((youtube) => {
          return (
            <S.YoutubeItem key={youtube.id}>
              TITLE :
              <S.FileName>{youtube.title}</S.FileName>
              PlayTime :
              <S.PlayTime>{youtube.play_time/1000}초</S.PlayTime>
              <S.Btns>
                <S.StyledBtn
                  onClick={() =>
                    playAudio("youtube", youtube.src, youtube.play_time)
                  }
                >
                  <S.HoverImage src="/images/yotube_icon.png" alt="" />
                </S.StyledBtn>
                <S.StyledBtn onClick={() => onRemove(youtube.id)}>
                  <S.HoverImage src="/images/x.svg" alt="" />
                </S.StyledBtn>
              </S.Btns>
            </S.YoutubeItem>
          );
        })
      )}
      {isEdit ? (
        <YoutubeInsert
          email={email}
          onRemove={() => {
            setIsEdit(false);
          }}
          refresh={setData}
        />
      ) : null}
      <S.PlusBtn
        onClick={() => {
          setIsEdit(true);
        }}
      >
        +
      </S.PlusBtn>
    </S.AudioContainer>
  );
};

export default YoutubeList;