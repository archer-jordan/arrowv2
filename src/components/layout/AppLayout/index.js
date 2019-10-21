import React from 'react';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
// COMPONENTS
import Header from './Header';
import AppNav from './AppNav';

const Container = styled.div`
  margin: auto;
  width: 1150px;
  max-width: 90%;
  padding-top: 16px;
`;

class AppLayout extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <AppNav pathname={this.props.location.pathname} />{' '}
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}

export default withRouter(AppLayout);
