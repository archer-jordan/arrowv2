import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Row, Col} from 'react-styled-flexboxgrid';

const AppNavContainer = styled.div`
  background: #0f3557;
  font-family: ${p => p.theme.fontFamily};
`;

const NavItemContainer = styled(Link)`
  color: ${p => (p.active ? p.theme.colors.support1 : '#fff')};
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease;
  &:hover {
    color: ${p => p.theme.colors.support4};
  }
`;

const CompanyName = styled.div`
  font-size: 18px;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

// const ActiveBar = styled.div`
//   height: 6px;
//   /* width: 70px; */
//   position: relative;
//   bottom: -18px;
//   background: ${p => (p.active ? p.theme.colors.support1 : 'transparent')};
// `;

const NavItem = ({children, active, to}) => (
  <div>
    <NavItemContainer active={active} to={to}>
      {children}
    </NavItemContainer>
    {/* <ActiveBar active={active} /> */}
  </div>
);

const MobileCol = styled(Col)`
  display: inherit !important;
  @media only screen and (max-width: 414px) {
    display: none !important;
  }
`;

const AppNav = ({pathname}) => {
  return (
    <AppNavContainer>
      <Row
        style={{
          height: 62,
          margin: 'auto',
          width: 1150,
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {' '}
        <Col xs={6}>
          <CompanyName>Company Name</CompanyName>
        </Col>
        <MobileCol xs={6}>
          <Row style={{width: '100%'}}>
            {' '}
            <Col xs={2} />
            <Col xs={2}>
              <NavItem
                to={`/reports`}
                active={pathname && pathname.includes('/reports')}
              >
                REPORTS
              </NavItem>
            </Col>
            <Col xs={2}>
              <NavItem
                to={`/account`}
                active={pathname && pathname.includes('/account')}
              >
                ACCOUNT
              </NavItem>
            </Col>
            <Col xs={2}>
              <NavItem
                to={`/employees`}
                active={pathname && pathname.includes('/employees')}
              >
                EMPLOYEES
              </NavItem>
            </Col>
            <Col xs={2} style={{textAlign: 'center'}}>
              <NavItem
                to={`/users`}
                active={pathname && pathname.includes('/users')}
              >
                USERS
              </NavItem>
            </Col>
            <Col xs={2}>
              <NavItem
                to={`/support`}
                active={pathname && pathname.includes('/support')}
              >
                SUPPORT
              </NavItem>
            </Col>
          </Row>
        </MobileCol>
      </Row>
    </AppNavContainer>
  );
};

export default AppNav;
