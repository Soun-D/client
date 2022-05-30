import React, { useEffect, useState } from "react";
import * as S from "./style/style";

const Modal = ({ urls, onChange, onSave }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(urls);
  }, [urls]);

  return (
    <S.Background
      onClick={() => {
        onSave();
      }}
    >
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.UrlInput
          name="urls"
          value={urls}
          placeholder="If you want to enter multiple URLs, separate them with comma"
          defaultValue={inputValue}
          onChange={onChange}
          maxLength="2000"
        />
      </S.ModalContainer>
    </S.Background>
  );
};

export default Modal;
