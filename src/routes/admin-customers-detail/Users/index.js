import React from 'react';
import Button from 'components/common/Button';
import UserForm from './UserForm';
// APOLLO
import saveUser from 'ApolloClient/Mutations/saveUser';
import customerByIdQuery from 'ApolloClient/Queries/customerById';
import {graphql} from 'react-apollo';

class Users extends React.PureComponent {
  state = {
    addNew: false,
  };
  onCreateUser = async newValues => {
    try {
      let params = {
        ...newValues,
        roles: ['coAdmin'],
        companyId: this.props.customer.id,
      };
      await this.props.saveUser({
        variables: {
          params,
        },
        refetchQueries: [
          {query: customerByIdQuery, variables: {id: this.props.customer.id}},
        ],
      });
      this.setState({addNew: false});
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    if (this.state.addNew) {
      return (
        <UserForm
          onSubmit={this.onCreateUser}
          onCancel={() => this.setState({addNew: false})}
        />
      );
    }
    return (
      <div style={{width: 300}}>
        {this.props.customer.users.map(item => item.id)}
        <Button
          style={{width: 120}}
          onClick={() => this.setState({addNew: true})}
        >
          Create User
        </Button>
      </div>
    );
  }
}

export default graphql(saveUser, {name: 'saveUser'})(Users);
