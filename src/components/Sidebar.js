import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  cursor: pointer;
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
        <Link to="/index.html">
          <StyledBtn>
            <img src="/images/home.svg" alt="" />
          </StyledBtn>
        </Link>

        <Link to="/audio">
          <StyledBtn>
            <img src="/images/mp3file.svg" alt="" />
          </StyledBtn>
        </Link>
      </Menu>
      <Menu>
        <Link to="/help">
          <StyledBtn>
            <img src="/images/help.svg" alt="" />
          </StyledBtn>
        </Link>
      </Menu>
    </StyledSidebar>
  );
};

export default Sidebar;
