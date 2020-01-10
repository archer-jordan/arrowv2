import React from 'react';
// COMPONENTS
import MessagesTable from './MessagesTable';
// APOLLO
import {Query} from 'react-apollo';
import supportMessages from 'ApolloClient/Queries/supportMessages';

class AdminSupport extends React.PureComponent {
  render() {
    return (
      <div
        style={{width: 900, margin: 'auto', maxWidth: '100%', marginTop: 96}}
      >
        <Query query={supportMessages}>
          {({loading, error, data}) => {
            if (error) return 'error';
            return (
              <MessagesTable
                dataSource={(data && data.supportMessages) || []}
                loading={loading}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default AdminSupport;
