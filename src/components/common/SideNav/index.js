import React from 'react';
import styled from 'styled-components';

const SideNavItemContainer = styled.div`
  margin-bottom: 8px;
  background: ${p => (p.active ? '#145d92' : 'inherit')};
  color: ${p => (p.active ? '#fff' : '#1371A3')};
  border-radius: 25px;
  min-width: 10px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  padding: 16px;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: flex-start;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease;
`;

const NavText = styled.p`
  font-size: 18px;
  margin: 0px;
`;

const SideNavItem = ({label, active, onClick}) => (
  <div onClick={onClick}>
    <SideNavItemContainer active={active}>
      <NavText>{label}</NavText>
    </SideNavItemContainer>
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
          key={item.label}
          label={item.label}
          active={tab === item.activeValue}
          onClick={item.onClick}
        />
      ))}
    </Container>
  );
};

export default SideNav;
