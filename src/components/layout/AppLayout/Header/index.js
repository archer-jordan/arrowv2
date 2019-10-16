import React from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-styled-flexboxgrid';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.svg';
import hamburgerSVG from 'lib/media/hamburger-menu.svg';

const HeaderContainer = styled.div`
  background: #145d92;
  font-family: ${p => p.theme.fontFamily};
`;

const Username = styled.div`
  color: #fff;
  font-family: ${p => p.theme.fontFamily};
  font-weight: 400;
  margin-left: auto;
`;

const SignoutBtn = styled.button`
  border: 0px;
  background: transparent;
  color: ${p => p.theme.colors.support1};
  margin: 0px;
  padding: 0px;
  font-size: 16px;
  margin-left: 8px;
  font-family: ${p => p.theme.fontFamily};
  text-decoration: underline;
  cursor: pointer;
  font-weight: 400;
`;

const MobileCol = styled(Col)`
  display: inherit !important;
  @media only screen and (max-width: 414px) {
    display: none !important;
  }
`;

const ShowMobileCol = styled(Col)`
  display: none !important;
  @media only screen and (max-width: 414px) {
    display: inherit !important;
  }
`;

const Header = () => (
  <HeaderContainer>
    <Row
      style={{
        height: 80,
        margin: 'auto',
        width: 1150,
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {' '}
      <Col xs={3}>
        <img src={logoWhiteSVG} alt="logo-white" height="40" />
      </Col>
      <Col xs={6}></Col>
      <MobileCol xs={3} style={{textAlign: 'right'}}>
        <Username>
          logged-in as Al Burr <SignoutBtn>sign-out</SignoutBtn>
        </Username>
      </MobileCol>
      <ShowMobileCol xs={1} />
      <ShowMobileCol xs={2} style={{textAlign: 'right'}}>
        <img src={hamburgerSVG} alt="menu" />
      </ShowMobileCol>
    </Row>
  </HeaderContainer>
);

export default Header;
