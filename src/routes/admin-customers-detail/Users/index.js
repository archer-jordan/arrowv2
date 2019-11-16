import React from 'react';
import Button from 'components/common/Button';
import message from 'components/common/message';
import UserForm from './UserForm';
import UsersTable from './UsersTable';
// APOLLO
import saveUser from 'ApolloClient/Mutations/saveUser';
import customerByIdQuery from 'ApolloClient/Queries/customerById';
import {graphql} from 'react-apollo';

class Users extends React.PureComponent {
  state = {
    addNew: false,
    loading: false,
  };
  onCreateUser = async newValues => {
    this.setState({
      loading: true,
    });
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
          {
            query: customerByIdQuery,
            variables: {id: this.props.customer.id},
          },
        ],
      });
      message.success('User successfully created!');
      this.setState({addNew: false, loading: false});
    } catch (err) {
      console.log(err);
    }
  };
  onSaveUser = async newValues => {
    this.setState({
      loading: true,
    });
    try {
      let params = {
        ...newValues,
        roles: ['coAdmin'],
        companyId: this.props.customer.id,
      };
      await this.props.saveUser({
        variables: {
          id: this.state.selected.id,
          params,
        },
        refetchQueries: [
          {
            query: customerByIdQuery,
            variables: {id: this.props.customer.id},
          },
        ],
      });
      message.success('User successfully created!');
      this.setState({addNew: false, loading: false});
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    if (this.state.addNew) {
      return (
        <UserForm
          onSubmit={this.onCreateUser}
          loading={this.state.loading}
          onCancel={() => this.setState({addNew: false})}
        />
      );
    }
    if (this.state.selected) {
      return (
        <UserForm
          onSubmit={this.onSaveUser}
          loading={this.state.loading}
          editing
          onCancel={() => this.setState({selected: false})}
          {...this.state.selected}
        />
      );
    }
    return (
      <div style={{width: 600}}>
        {' '}
        <UsersTable
          dataSource={this.props.customer.adminUsers}
          onClick={selected => this.setState({selected})}
        />
        <Button
          style={{width: 120, marginBottom: 8, marginTop: 32}}
          onClick={() => this.setState({addNew: true})}
        >
          Create User
        </Button>
      </div>
    );
  }
}

export default graphql(saveUser, {name: 'saveUser'})(Users);
