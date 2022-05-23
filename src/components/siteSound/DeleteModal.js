import React from "react";
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

const CloseIcon = styled.button`
  background: none;
  box-sizing: border-box;
  padding: 1px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 60px;
  height: 40px;
`;

const AreYouSure = styled.span``;

const DeleteModal = ({ sayYesOrNo }) => {
  return (
    <Background onClick={() => sayYesOrNo(false)}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <AreYouSure>
          Are you sure about deleting your
          <br /> Site Sound?
        </AreYouSure>
        <BtnContainer>
          <CloseIcon onClick={() => sayYesOrNo(true)}>Yes</CloseIcon>
          <CloseIcon onClick={() => sayYesOrNo(false)}>No</CloseIcon>
        </BtnContainer>
      </ModalContainer>
    </Background>
  );
};

export default DeleteModal;
