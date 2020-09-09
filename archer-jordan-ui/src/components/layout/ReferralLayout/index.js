import React from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
// COMPONENTS
import Header from './Header';
import AppNav from './AppNav';
import Footer from 'components/common/Footer';

const Container = styled.div`
  margin: auto;
  width: 1150px;
  max-width: 90%;
  padding-top: 16px;
  padding-bottom: 56px;
  min-height: calc(100vh - 289px);
`;

export default ({currentUser, children}) => {
  let location = useLocation();
  return (
    <div>
      <Header currentUser={currentUser} />
      <AppNav currentUser={currentUser} pathname={location.pathname} />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};
