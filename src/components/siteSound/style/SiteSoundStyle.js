import styled from "styled-components";

export const SiteSoundItem = styled.li`
  list-style: none;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 51px;
  width: 100%;
  padding-left: 10px;
`;

export const DefaultBtn = styled.button`
  background: none;
  border: none;
  padding: 3px 3px 0px 0px;
  box-sizing: border-box;
`;

export const AudioSelect = styled.select`
  width: 187px;
  height: 20px;
`;

export const EditBtn = styled(DefaultBtn)`
  border: solid 1px black;
  padding: 1px;
`;

export const HoverImg = styled.img`
  border-radius: 10px;
  transition: all ease 1s;
  &:hover {
    background-color: lightgray;
    transform: rotate(360deg);
  }
`;

export const Urls = styled.span`
  word-break: break-all;
  width: 177px;
  height: 40px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
  border: 1px solid black;
`;

export const PlayBtn = styled.button`
  bottom: 3px;
  background-color: white;
  border: none;
  cursor: pointer;
`;

/* SiteSoundInsert ↓ */

export const NewSiteSound = styled(SiteSoundItem)`
    background-color: #DFD9D9;
`