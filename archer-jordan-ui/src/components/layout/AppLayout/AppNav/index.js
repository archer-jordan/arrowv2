import React from 'react';
import styled from 'styled-components';
import NavItem from 'components/common/NavItem';

const AppNavContainer = styled.div`
  background: ${(p) => p.theme.colors.primary2};
  font-family: ${(p) => p.theme.fontFamily};
  border-bottom: 1px solid #efefef;
`;

const CompanyName = styled.div`
  font-size: 18px;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

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

const AppNav = ({pathname, currentUser}) => {
  let canViewReports =
    currentUser.roles.includes('coAdmin') &&
    currentUser.permissions.includes('viewCompanyData');

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
            <CompanyName>{currentUser.company.title}</CompanyName>
          </div>
          <RightContainer>
            {canViewReports || currentUser.roles.includes('superAdmin') ? (
              <MobileCol>
                <NavItem
                  to={`/reports`}
                  active={pathname && pathname.includes('/reports')}
                >
                  REPORTS
                </NavItem>
              </MobileCol>
            ) : null}
            {currentUser.roles.includes('coEmployee') && (
              <MobileCol>
                <NavItem
                  to={`/dashboard`}
                  active={pathname && pathname.includes('/dashboard')}
                >
                  DASHBOARD
                </NavItem>
              </MobileCol>
            )}
            <MobileCol>
              <NavItem
                to={`/account`}
                active={pathname && pathname.includes('/account')}
              >
                ACCOUNT
              </NavItem>
            </MobileCol>
            {((currentUser.roles.includes('coAdmin') &&
              currentUser.permissions.includes('viewEmployeeData')) ||
              currentUser.roles.includes('superAdmin')) && (
              <MobileCol>
                <NavItem
                  to={`/employees`}
                  active={pathname && pathname.includes('/employees')}
                >
                  EMPLOYEES
                </NavItem>
              </MobileCol>
            )}
            {((currentUser.roles.includes('coAdmin') &&
              currentUser.permissions.includes('manageUsers')) ||
              currentUser.roles.includes('superAdmin')) && (
              <MobileCol>
                <NavItem
                  to={`/users`}
                  active={pathname && pathname.includes('/users')}
                >
                  USERS
                </NavItem>
              </MobileCol>
            )}
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
