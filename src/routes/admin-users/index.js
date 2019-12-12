import React from 'react';
import UsersTable from './UsersTable';
// APOLLO CLIENT
import {Query} from 'react-apollo';
import usersQuery from 'ApolloClient/Queries/users';

class AdminUsers extends React.PureComponent {
  render() {
    return (
      <Query query={usersQuery} variables={{roles: ['superAdmin']}}>
        {({loading, data, error}) => {
          if (loading) return 'loading';
          if (error) return 'error';
          return (
            <UsersTable
              dataSource={(data && data.users && data.users.users) || []}
              total={data.users.count}
              loading={loading}
            />
          );
        }}
      </Query>
    );
  }
}

export default AdminUsers;
