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
  flex: 3;
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
            <CompanyName>ARCHER JORDAN ADMIN</CompanyName>
          </div>
          <RightContainer>
            <MobileCol>
              <NavItem
                to={`/admin/customers`}
                active={
                  (pathname && pathname.includes('/customers')) ||
                  pathname === '/admin'
                }
              >
                CUSTOMERS
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
            <MobileCol>
              <NavItem
                to={`/admin/support`}
                active={pathname && pathname.includes('/support')}
              >
                SUPPORT
              </NavItem>
            </MobileCol>
            <MobileCol>
              <NavItem
                to={`/admin/docs`}
                active={pathname && pathname.includes('/docs')}
              >
                ACT DOCS
              </NavItem>
            </MobileCol>
            <MobileCol>
              <NavItem
                to={`/admin/partners`}
                active={pathname && pathname.includes('/partners')}
              >
                REFERRAL PARTNERS
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
