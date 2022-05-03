/*global chrome*/

import React from "react";
import SsItem from "./SsItem";
import styled from "styled-components";

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

const SsList = styled.div`
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
`;

const MainContainer = ({ ssItems }) => {
  function onRemove() {
    console.log("onRemove");
  }
  return (
    <Main>
      <Columns>
        <span styles="margin-right: 40px;">URL(S)</span>
        <span>SOUND</span>
      </Columns>
      <SsList>
        {ssItems.map((ssItem) => (
          <SsItem ssItem={ssItem} key={ssItem.id} onRemove={onRemove} />
        ))}
      </SsList>
      <PlusBtn>+</PlusBtn>
    </Main>
  );
};

export default MainContainer;
