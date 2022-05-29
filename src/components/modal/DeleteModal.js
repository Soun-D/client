import React from "react";
import * as S from "./style/style";

const DeleteModal = ({ sayYesOrNo }) => {
  return (
    <S.Background onClick={() => sayYesOrNo(false)}>
      <S.DeleteModalContainer onClick={(e) => e.stopPropagation()}>
        <span>
          Are you sure about deleting your
          <br /> Site Sound?
        </span>
        <S.Btns>
          <button onClick={() => sayYesOrNo(true)}>Yes</button>
          <button onClick={() => sayYesOrNo(false)}>No</button>
        </S.Btns>
      </S.DeleteModalContainer>
    </S.Background>
  );
};

export default DeleteModal;
