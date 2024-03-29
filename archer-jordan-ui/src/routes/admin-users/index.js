import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import Button from 'components/common/Button';
import UsersTable from './UsersTable';
import UserForm from 'components/forms/UserForm';
import message from 'components/common/message';
import Alert from 'components/common/Alert';
import ErrorBlock from 'components/common/ErrorBlock';
// APOLLO CLIENT
import compose from 'lodash/flowRight';
import {Query, graphql} from 'react-apollo';
import adminUsers from 'ApolloClient/Queries/adminUsers';
import createSuperAdminUser from 'ApolloClient/Mutations/createSuperAdminUser';
import deleteUser from 'ApolloClient/Mutations/deleteUser';
// LIB
import ErrorHelpers from 'lib/helpers/ErrorHelpers';

const Container = styled.div`
  width: 900px;
  margin: auto;
  max-width: 100%;
  margin-top: 40px;
`;

class AdminUsers extends React.PureComponent {
  state = {
    addNew: false,
    loading: false,
    errors: [],
  };
  onCreateUser = async (newValues) => {
    this.setState({
      loading: true,
    });
    try {
      // create our args object for the mutation
      let params = {
        ...newValues,
      };
      // call our mutation
      await this.props.createSuperAdminUser({
        variables: {
          params,
        },
        // refresh the users table after
        refetchQueries: [
          {
            query: adminUsers,
          },
        ],
      });
      // success message popup
      message.success('User successfully created!');
      // reset the state
      this.setState({addNew: false, loading: false, successfulAdd: true});
    } catch (err) {
      ErrorHelpers.handleError(err);
      // reset the state
      this.setState({errors: [err.message], loading: false});
    }
  };
  onDeleteUser = async (id) => {
    try {
      // call our mutation
      await this.props.deleteUser({
        variables: {
          id,
        },
        // refresh the users table after
        refetchQueries: [
          {
            query: adminUsers,
          },
        ],
      });
    } catch (err) {
      ErrorHelpers.handleError(err);
      // reset the state
      this.setState({addNew: false, loading: false});
    }
  };
  render() {
    if (this.state.addNew) {
      return (
        <Container>
          <UserForm
            onSubmit={this.onCreateUser}
            loading={this.state.loading}
            showPermissions={false}
            onCancel={() => this.setState({addNew: false})}
          />
          {this.state.errors && this.state.errors.length > 0 && (
            <ErrorBlock errors={this.state.errors} />
          )}
        </Container>
      );
    }
    return (
      <Container>
        {/* ADD BUTTON */}
        <Button
          onClick={() => this.setState({addNew: true})}
          style={{width: 150, marginBottom: 16}}
        >
          + Add New User
        </Button>
        {/* USERS TABLE */}
        <Query query={adminUsers}>
          {({loading, data, error}) => {
            if (error) return 'error';
            return (
              <UsersTable
                dataSource={
                  (data && data.adminUsers && data.adminUsers.users) || []
                }
                total={(data && data.adminUsers && data.adminUsers.count) || 0}
                loading={loading}
                onDeleteUser={this.onDeleteUser}
              />
            );
          }}
        </Query>
        {/* SUCESS ALERT BOX */}
        {this.state.successfulAdd && (
          <div style={{width: 700, maxWidth: '100%'}}>
            <Alert
              message="User successfully created"
              description={
                <p>
                  The new user can create a password via{' '}
                  <a href={`${window.location.host}/register`}>
                    {window.location.host}/register
                  </a>
                </p>
              }
              type="success"
              closable
              showIcon
            />
          </div>
        )}
      </Container>
    );
  }
}

export default compose(
  graphql(createSuperAdminUser, {name: 'createSuperAdminUser'}),
  graphql(deleteUser, {name: 'deleteUser'})
)(AdminUsers);
