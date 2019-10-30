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
                to={`/reports`}
                active={pathname && pathname.includes('/reports')}
              >
                REPORTS
              </NavItem>
            </MobileCol>
            <MobileCol>
              <NavItem
                to={`/account`}
                active={pathname && pathname.includes('/account')}
              >
                ACCOUNT
              </NavItem>
            </MobileCol>
            <MobileCol>
              <NavItem
                to={`/employees`}
                active={pathname && pathname.includes('/employees')}
              >
                EMPLOYEES
              </NavItem>
            </MobileCol>
            <MobileCol>
              <NavItem
                to={`/users`}
                active={pathname && pathname.includes('/users')}
              >
                USERS
              </NavItem>
            </MobileCol>
            <MobileCol>
              <NavItem
                to={`/support`}
                active={pathname && pathname.includes('/support')}
              >
                SUPPORT
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

// <Row style={{width: '100%'}}>
//   {' '}
//   <Col xs={2} />
//   <Col xs={2}>
//     <NavItem to={`/reports`} active={pathname && pathname.includes('/reports')}>
//       REPORTS
//     </NavItem>
//   </Col>
//   <Col xs={2}>
//     <NavItem to={`/account`} active={pathname && pathname.includes('/account')}>
//       ACCOUNT
//     </NavItem>
//   </Col>
//   <Col xs={2}>
//     <NavItem
//       to={`/employees`}
//       active={pathname && pathname.includes('/employees')}
//     >
//       EMPLOYEES
//     </NavItem>
//   </Col>
//   <Col xs={2} style={{textAlign: 'center'}}>
//     <NavItem to={`/users`} active={pathname && pathname.includes('/users')}>
//       USERS
//     </NavItem>
//   </Col>
//   <Col xs={2}>
//     <NavItem to={`/support`} active={pathname && pathname.includes('/support')}>
//       SUPPORT
//     </NavItem>
//   </Col>
// </Row>;
