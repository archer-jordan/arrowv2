import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const AppNavContainer = styled.div`
  background: #0f3557;
  font-family: ${p => p.theme.fontFamily};
  border-bottom: 1px solid #efefef;
`;

const NavItemContainer = styled(Link)`
  color: ${p => (p.active ? p.theme.colors.support1 : '#fff')} !important;
  text-align: center;
  cursor: pointer;
  letter-spacing: 1px;
  font-size: 16px !important;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease;
  &:hover {
    color: ${p => p.theme.colors.support4} !important;
  }
`;

const CompanyName = styled.div`
  font-size: 18px;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ActiveBar = styled.div`
  height: 6px;
  width: 100%;
  position: relative;
  bottom: -16px;
  background: ${p => (p.active ? p.theme.colors.support1 : 'transparent')};
`;

const NavItem = ({children, active, to}) => (
  <div>
    <NavItemContainer active={active} to={to}>
      {children}
    </NavItemContainer>
    <ActiveBar active={active} />
  </div>
);

const MobileCol = styled.div`
  display: inline-flex !important;
  margin-left: 24px;
`;

const RightContainer = styled.div`
  flex: 1;
  justify-content: flex-end;
  display: flex;
  @media only screen and (max-width: 414px) {
    display: none !important;
  }
`;

const AppNav = ({pathname}) => {
  return (
    <React.Fragment>
      <AppNavContainer>
        <div
          style={{
            height: 62,
            margin: 'auto',
            width: 1150,
            maxWidth: '90%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {' '}
          <div style={{flex: 1}}>
            <CompanyName>Company Name</CompanyName>
          </div>
          <RightContainer>
            <MobileCol>
              <NavItem
                to={`/admin/customers`}
                active={pathname && pathname.includes('/customers')}
              >
                CUSTOMERS
              </NavItem>
            </MobileCol>
            <MobileCol>
              <NavItem
                to={`/admin/vendors`}
                active={pathname && pathname.includes('/vendors')}
              >
                VENDORS
              </NavItem>
            </MobileCol>
            <MobileCol>
              <NavItem
                to={`/admin/users`}
                active={pathname && pathname.includes('/users')}
              >
                USERS
              </NavItem>
            </MobileCol>
          </RightContainer>
        </div>
        {/* */}
      </AppNavContainer>
    </React.Fragment>
  );
};

export default AppNav;
