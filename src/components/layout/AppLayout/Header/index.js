import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.svg';
import hamburgerSVG from 'lib/media/hamburger-menu.svg';
import DrawerContent from './DrawerContent';
import Drawer from 'antd/lib/drawer';
import 'antd/lib/drawer/style/css';

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

const Header = ({history, location}) => {
  const [visisble, setVisible] = useState(false);
  const {tab} = queryString.parse(location.search);
  const onUrlChange = (baseUrl, newValues) => {
    let oldParams = queryString.parse(location.search);
    let newParams = {
      ...oldParams,
      ...newValues,
    };
    let newString = queryString.stringify(newParams);
    history.push(`/${baseUrl}?${newString}`);
    setVisible(false);
  };
  return (
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
        <Col xs={6}>
          <img src={logoWhiteSVG} alt="logo-white" height="40" />
        </Col>
        <Col xs={12}></Col>
        <MobileCol xs={6} style={{textAlign: 'right'}}>
          <Username>
            logged-in as Al Burr <SignoutBtn>sign-out</SignoutBtn>
          </Username>
        </MobileCol>
        <ShowMobileCol xs={2} />
        <ShowMobileCol xs={4} style={{textAlign: 'right'}}>
          <img onClick={() => setVisible(true)} src={hamburgerSVG} alt="menu" />{' '}
          <Drawer onClose={() => setVisible(false)} visible={visisble}>
            <DrawerContent
              activeTab={tab}
              pathname={location.pathname}
              setVisible={setVisible}
              onUrlChange={onUrlChange}
            />
          </Drawer>
        </ShowMobileCol>
      </Row>{' '}
    </HeaderContainer>
  );
};

export default withRouter(Header);
