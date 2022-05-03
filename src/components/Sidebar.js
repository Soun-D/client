/*global chrome*/

import React from "react";
import styled from "styled-components";

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: solid 1px black;
  width: 55px;
  height: 100%;
`;

const StyledBtn = styled.button`
  background: white;
  border: none;
  padding: 3px 3px 0px 0px;
  box-sizing: border-box;
  &:hover {
      color: black;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Menu>
        <StyledBtn>
          <img src="/images/home.svg" alt="" />
        </StyledBtn>
        <StyledBtn>
          <img src="/images/mp3file.svg" alt="" />
        </StyledBtn>
      </Menu>
      <Menu>
        <StyledBtn>
          <img src="/images/refresh.svg" alt="" />
        </StyledBtn>
        <StyledBtn>
          <img src="/images/help.svg" alt="" />
        </StyledBtn>
      </Menu>
    </StyledSidebar>
  );
};

export default Sidebar;
