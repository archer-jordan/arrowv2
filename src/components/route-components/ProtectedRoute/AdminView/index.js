import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import Icon from 'components/common/Icon';
// APOLLO
import {graphql} from 'react-apollo';
import impersonateCustomer from 'ApolloClient/Mutations/impersonateCustomer';
import currentUser from 'ApolloClient/Queries/currentUser';
import client from 'ApolloClient/index.js';

const Container = styled.div`
  background: ${p => p.theme.colors.red9};
  height: 50px;
  width: 150px;
  border-radius: 25px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: ${p => p.theme.colors.red1};
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease;
  &:hover {
    background: ${p => p.theme.colors.red8};
  }
`;

class AdminView extends React.PureComponent {
  state = {
    loading: false,
  };
  onTurnOffImpersonate = async () => {
    try {
      this.setState({loading: true});
      await this.props.impersonateCustomer({
        variables: {
          customerId: '',
          turnOff: true,
        },
        refetchQueries: [{query: currentUser}],
      });
      await client.query({
        query: currentUser,
      });

      setTimeout(() => {
        this.props.history.push(`/admin/customers`);
      }, 750);
    } catch (err) {
      this.setState({loading: false});
      console.log(err);
    }
  };
  render() {
    return (
      <Container>
        <div>
          {!this.state.loading ? (
            <div onClick={this.onTurnOffImpersonate}>
              <Icon type="arrow-left" style={{fontSize: 14, marginRight: 4}} />
              Back to Admin
            </div>
          ) : (
            <Icon type="loading" />
          )}
        </div>
      </Container>
    );
  }
}

export default graphql(impersonateCustomer, {name: 'impersonateCustomer'})(
  withRouter(AdminView)
);
