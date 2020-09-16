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
            <CompanyName>REFERRAL PARTNERS</CompanyName>
          </div>
          <RightContainer>
            <MobileCol>
              <NavItem to={`/referral`} active={pathname === '/referral'}>
                PROFILE
              </NavItem>
            </MobileCol>
            <MobileCol>
              <NavItem
                to={`/referral/accounts`}
                active={pathname && pathname.includes('/accounts')}
              >
                ACCOUNTS
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
