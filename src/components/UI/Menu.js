import React from "react";
import styled from "styled-components";

const MenuIcon = styled.div`
  position: relative;
  width: 36px;
  height: 24px;
  margin-right: 8px;
  border-radius: 2px;

  &:hover {
    background: rgba(33, 194, 248, 0.6);

    span {
      background: ${prop => prop.theme.black};
    }
  }
`;

const Line = styled.span`
  position: absolute; 
  height: 3px; 
  width: 80%; 
  left: 4px;
  background: ${prop => prop.theme.teal};
  border-radius: 2px;
`;

const Line1 = styled(Line)`
  top: 15%
`;
const Line2 = styled(Line)`
  top: 45%
`;
const Line3 = styled(Line)`
  top: 75%
`;

export const Menu = ({ handleClick }) => (
  <MenuIcon onClick={handleClick}>
    <Line1 />
    <Line2 />
    <Line3 />
  </MenuIcon>
);
