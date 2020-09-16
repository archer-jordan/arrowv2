import React from 'react';
import styled from 'styled-components';
import footerLogo from './aj-logo.png';
import {Link} from 'react-router-dom';

const Container = styled.div`
  background: ${(p) => p.theme.colors.primary2};
  height: 146px;
  display: flex;
  padding-left: 8%;
  padding-right: 8%;
`;

const Col = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
`;

const Caption = styled.p`
  margin: 0px;
  color: #fff;
  font-weight: 300;
  margin-left: 8px;
  color: #abeaee;
  margin-bottom: 4px;
  font-size: 14px;
`;

export default () => {
  return (
    <Container>
      <Col>
        <div>
          <Caption>Brought to you by</Caption>
          <Logo src={footerLogo} alt="footer-logo" />
        </div>
      </Col>
      <Col style={{justifyContent: 'flex-end', textAlign: 'right'}}>
        {' '}
        <div>
          <Caption>© {new Date().getFullYear()} Archer Jordan</Caption>
          <div style={{marginTop: 4}}>
            <Link to="/terms">Terms & Conditions</Link>
            <span style={{color: '#fff'}}>{' | '}</span>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </Col>
    </Container>
  );
};
