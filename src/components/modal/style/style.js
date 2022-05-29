import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const DeleteModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: white;
  top: 120px;
  left: 180px;
  border-radius: 20px;
  width: 280px;
  height: 80px;
  z-index: 2;
`;

export const Btns = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  right: 10px;
  bottom: 0px;
  width: 80px;
  height: 40px;
`;


/* Modal ↓ */

export const ModalContainer = styled.div`
  position: relative;
  background-color: none;
  top: 80px;
  left: 140px;
  width: 400px;
  height: 200px;
  z-index: 2;
`;
 
 export const CloseIcon = styled.button`
  background: none;
  position: absolute;
  bottom: 7px;
  left: 330px;
  border: none;
`;

export const UrlInput = styled.textarea`
  background-color: none;
  width: 100%;
  height: 100%;
  resize: none;
`;