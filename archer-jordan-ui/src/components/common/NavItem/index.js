import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NavItemContainer = styled(Link)`
  color: ${(p) => (p.active ? p.theme.colors.support1 : '#fff')} !important;
  text-align: center;
  cursor: pointer;
  letter-spacing: 1px;
  font-size: 16px !important;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease;
  &:hover {
    color: ${(p) => p.theme.colors.support4} !important;
  }
`;

const ActiveBar = styled.div`
  height: 6px;
  width: 100%;
  position: relative;
  bottom: -16px;
  background: ${(p) => (p.active ? p.theme.colors.support1 : 'transparent')};
`;

export default ({children, active, to}) => (
  <div>
    <NavItemContainer active={active} to={to}>
      {children}
    </NavItemContainer>
    <ActiveBar active={active} />
  </div>
);
