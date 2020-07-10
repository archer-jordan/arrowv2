import React from 'react';
import {withRouter} from 'react-router-dom';
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

// 63 +80

class AppLayout extends React.PureComponent {
  render() {
    return (
      <div>
        <Header currentUser={this.props.currentUser} />
        <AppNav
          currentUser={this.props.currentUser}
          pathname={this.props.location.pathname}
        />{' '}
        <Container>{this.props.children}</Container>
        <Footer />
      </div>
    );
  }
}

export default withRouter(AppLayout);
