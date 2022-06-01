import React from "react";
import { Oval as O } from "react-loader-spinner";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <O color="#3d66ba" height={30} width={30} />
    </SpinnerContainer>
  );
};

export default Spinner;
