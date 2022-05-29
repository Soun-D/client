import React, { useEffect, useState } from "react";
import * as S from "./style/style";

const Modal = ({ urls, onUrlChange, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(urls);
  }, []);

  return (
    <S.Background
      onClick={() => {
        onClose();
      }}
    >
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.UrlInput
          placeholder="If you want to enter multiple URLs, separate them with comma"
          defaultValue={inputValue}
          onChange={onUrlChange}
          maxLength="2000"
        ></S.UrlInput>
        <S.CloseIcon onClick={onSave}>
          <img src="/images/save.svg" alt="" />
        </S.CloseIcon>
      </S.ModalContainer>
    </S.Background>
  );
};

export default Modal;
