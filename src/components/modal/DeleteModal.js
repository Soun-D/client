import React from "react";
import * as S from "./style/style";

const DeleteModal = ({ onClose, onRemove }) => {
  return (
    <S.Background onClick={onClose}>
      <S.DeleteModalContainer onClick={(e) => e.stopPropagation()}>
        <span>
          Are you sure about deleting your
          <br /> Site Sound?
        </span>
        <S.Btns>
          <button
            onClick={() => {
              onRemove();
              onClose();
            }}
          >
            Yes
          </button>
          <button onClick={onClose}>No</button>
        </S.Btns>
      </S.DeleteModalContainer>
    </S.Background>
  );
};

export default DeleteModal;
