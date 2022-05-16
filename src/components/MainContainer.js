import React, { useState, useRef, useEffect } from "react";
import SiteSound from "./SiteSound";
import styled from "styled-components";
import SiteSoundInsert from "./SiteSoundInsert";

const Main = styled.div`
  position: relative;
  width: 100%;
`;

const Columns = styled.section`
  display: flex;
  justify-content: space-around;
  height: 30px;
  width: 468px;
  font-weight: bold;
`;

const SiteSoundList = styled.div`
  height: 240px;
  width: 530px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  &::-webkit-scrollbar {
    /* display: none; */
  }
`;

const PlusBtn = styled.button`
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const MainContainer = ({ SiteSoundItems, audioFiles, onRemove, refresh }) => {
  const [isEdit, setIsEdit] = useState(false);

  const mainRef = useRef();

  const onEditSiteSound = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    mainRef.current.scrollTo(0, (SiteSoundItems.length + 1) * 51 * isEdit);
  }, [isEdit]);

  return (
    <Main>
      <Columns>
        <span styles="margin-right: 40px;">URL(S)</span>
        <span>SOUND</span>
      </Columns>
      <SiteSoundList ref={mainRef}>
        {SiteSoundItems.map((SiteSoundItem) => (
          <SiteSound
            siteSoundItem={SiteSoundItem}
            audioFiles={audioFiles}
            key={SiteSoundItem.id}
            onRemove={onRemove}
            refresh={refresh}
          />
        ))}
        {isEdit ? (
          <SiteSoundInsert
            onRemove={() => {
              setIsEdit(false);
            }}
            audioFiles={audioFiles}
            refresh={refresh}
          ></SiteSoundInsert>
        ) : null}
      </SiteSoundList>
      <PlusBtn onClick={onEditSiteSound}>+</PlusBtn>
    </Main>
  );
};

export default MainContainer;
