import styled from "styled-components";

export const AudioContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const FileName = styled.b`
  margin-right: 10px;
  width: 200px;
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

export const YoutubeItem = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid black;
`;

export const IframeInput = styled.input`
  word-break: break-all;
  font-size: 20px;
  width: 200px;
  height: 40;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const EditBtn = styled.button`
  background: none;
  box-sizing: border-box;
  height: 30px;
  border: solid 1px black;
  display: flex;
  align-items: center;
`;

export const StyledBtn = styled.button`
  background: none;
  border: none;
  padding: 3px 3px 0px 0px;
  box-sizing: border-box;
`;

export const Btns = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const HoverImage = styled.img`
  border-radius: 10px;
  transition: all ease 1s;
  &:hover {
    background-color: lightgray;
    transform: rotate(360deg);
  }
`;

export const CloseTimeInput = styled.input`
  width: 60px;
`;

export const PlayTime = styled.span`
  width: 60px;
`;
