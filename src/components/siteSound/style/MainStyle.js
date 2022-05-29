import styled from "styled-components";

export const Main = styled.div`
  position: relative;
  width: 100%;
`;

export const Columns = styled.section`
  display: flex;
  justify-content: space-around;
  height: 30px;
  width: 468px;
  font-weight: bold;
`;

export const SiteSoundList = styled.div`
  height: 240px;
  width: 530px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
`;

export const PlusBtn = styled.button`
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  background-color: black;
  color: white;
  cursor: pointer;
`;
