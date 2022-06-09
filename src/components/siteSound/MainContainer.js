import React, { useState, useRef, useEffect, useCallback } from "react";
import SiteSound from "./SiteSound";
import SiteSoundInsert from "./SiteSoundInsert";
import {
  getBothAudioList,
  getSiteSoundList,
  deleteSiteSound,
} from "../utils/api";
import Spinner from "../utils/Spinner";
import * as S from "./style/MainStyle";

const MainContainer = ({ email, isPlaying, setIsPlaying }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [siteSoundList, setSiteSoundList] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const mainRef = useRef();

  const setData = useCallback(async () => {
    try {
      setIsLoading(true);

      const bothAudioRes = await getBothAudioList(email);
      setAudioList(bothAudioRes.data);
      const siteSoundRes = await getSiteSoundList(email);
      setSiteSoundList(siteSoundRes.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [email]);

  useEffect(() => {
    setData();
  }, [setData]);

  const onRemove = (siteSoundId) => {
    deleteSiteSound(siteSoundId).then(() =>
      setSiteSoundList(
        siteSoundList.filter((siteSound) => siteSound.id !== siteSoundId)
      )
    );
  };

  return (
    <S.Main>
      <S.Columns>
        <span>URL(S)</span>
        <span>SOUND</span>
      </S.Columns>
      {isLoading ? (
        <Spinner />
      ) : (
        <S.SiteSoundList ref={mainRef}>
          {siteSoundList.map((siteSoundItem) => (
            <SiteSound
              siteSoundItem={siteSoundItem}
              audioList={audioList}
              key={siteSoundItem.id}
              onRemove={onRemove}
              refresh={setData}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          ))}
          {isEdit ? (
            <SiteSoundInsert
              onRemove={() => {
                setIsEdit(false);
              }}
              audioList={audioList}
              refresh={setData}
            />
          ) : null}
        </S.SiteSoundList>
      )}
      <S.PlusBtn
        onClick={() => {
          mainRef.current.scrollTo(0, (siteSoundList.length + 1) * 51 * isEdit);
          setIsEdit(true);
        }}
      >
        +
      </S.PlusBtn>
    </S.Main>
  );
};

export default MainContainer;
