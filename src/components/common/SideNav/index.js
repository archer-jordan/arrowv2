import React from 'react';
import styled from 'styled-components';

const SideNavItemContainer = styled.div`
  margin-bottom: 24px;
  background: ${p => (p.active ? '#145d92' : 'inherit')};
  color: ${p => (p.active ? '#fff' : '#1371A3')};
  border-radius: 25px;
  min-width: 10px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  padding: 5px;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: flex-start;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease;
`;

const SideNavItem = ({label, active, onClick}) => (
  <div onClick={onClick}>
    <SideNavItemContainer active={active}>{label}</SideNavItemContainer>
  </div>
);

const Container = styled.div`
  @media only screen and (max-width: 414px) {
    display: none !important;
  }
`;

const SideNav = ({items, tab}) => {
  return (
    <Container>
      {items.map(item => (
        <SideNavItem
          label={item.label}
          active={tab === item.activeValue}
          onClick={item.onClick}
        />
      ))}
    </Container>
  );
};

export default SideNav;
