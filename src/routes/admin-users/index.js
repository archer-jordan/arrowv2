import React from 'react';
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
          console.log(data);
          return null;
        }}
      </Query>
    );
  }
}

export default AdminUsers;
