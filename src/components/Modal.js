import React, { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalContainer = styled.div`
  position: fixed;
  background-color: white;
  top: 40px;
  left: 80px;
  width: 400px;
  height: 200px;
  z-index: 2;
`;

const CloseIcon = styled.button`
  background: none;
  box-sizing: border-box;
  position: absolute;
  bottom: 7px;
  left: 337px;
  padding: 1px;
  border: none;
`;

const UrlInput = styled.textarea`
  width: 400px;
  height: 200px;
  resize: none;
`;

const Modal = ({ urls, onClose }) => {
  return (
    <Background>
      <ModalContainer>
        <UrlInput
          placeholder="If you want to enter multiple URLs, separate them with commas"
          defaultValue={urls.split(",").map((url) => `${url}, `)}
        ></UrlInput>
        <CloseIcon onClick={onClose}>
          <img src="/images/save.svg" alt="" />
        </CloseIcon>
      </ModalContainer>
    </Background>
  );
};

export default Modal;
