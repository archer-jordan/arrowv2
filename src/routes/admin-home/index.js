import React from 'react';
// APOLLO
import AuthHelpers from 'lib/helpers/AuthHelpers';
import ApolloClient from 'ApolloClient/index.js';

class AdminHome extends React.PureComponent {
  onLogout = async () => {
    await AuthHelpers.signOut(this.props.currentUser.id);
    await ApolloClient.resetStore();
    return this.props.history.push('/');
  };
  render() {
    return (
      <div>
        AdminHome <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

export default AdminHome;
