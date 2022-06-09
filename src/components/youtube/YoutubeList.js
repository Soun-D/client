import React, { useEffect, useState, useCallback } from "react";
import { deleteAudioFile, getYoutubeList } from "../utils/api";
import Spinner from "../utils/Spinner";
import YoutubeInsert from "./YoutubeInsert";
import * as S from "./style/style";
import YoutubeItem from "./YoutubeItem";

const YoutubeList = ({ email, isPlaying, setIsPlaying }) => {
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
            <YoutubeItem
              key={youtube.id}
              youtube={youtube}
              onRemove={onRemove}
              refresh={setData}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
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
