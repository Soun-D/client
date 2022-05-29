import styled from "styled-components";

export const AudioContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const AudioItem = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid black;
`;

export const CancelBtn = styled.button`
  background: none;
  border: none;
  padding: 3px 3px 0px 0px;
  box-sizing: border-box;
  left: 500px;
  position: absolute;
`;

export const StyledBtn = styled.button`
  background: none;
  border: none;
  padding: 3px 3px 0px 0px;
  box-sizing: border-box;
`;

export const HoverImage = styled.img`
  border-radius: 10px;
  transition: all ease 1s;
  &:hover {
    background-color: lightgray;
    transform: rotate(360deg);
  }
`;

export const Title = styled.b`
  margin-right: 10px;
`;

export const PlusBtn = styled.button`
  position: absolute;
  width: 50%;
  height: 40px;
  bottom: 0;
  left: 240px;
  background-color: white;
  font-weight: bold;
  font-size: 20px;
  border: 1px solid black;
  border-radius: 20px;
  margin: 0px 0px 1px 38px;
  cursor: pointer;
`;

export const InputFile = styled.input`
  position: absolute;
  bottom: 0;
`;