import React from 'react';
import compose from 'lodash/flowRight';
import Button from 'components/common/Button';
import message from 'components/common/message';
import Loading from 'components/common/Loading';
import ErrorBlock from 'components/common/ErrorBlock';
import UserForm from 'components/forms/UserForm';
import UsersTable from './UsersTable';
// APOLLO
import createNewUser from 'ApolloClient/Mutations/createNewUser';
import saveUser from 'ApolloClient/Mutations/saveUser';
import makeEmployeeAnAdmin from 'ApolloClient/Mutations/makeEmployeeAnAdmin';
import customerByIdQuery from 'ApolloClient/Queries/customerById';
import customerAdminsQuery from 'ApolloClient/Queries/customerAdmins';
import {graphql, Query} from 'react-apollo';

class Users extends React.PureComponent {
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
      let params = {
        ...newValues,
        customerId: this.props.customer.id,
      };
      await this.props.createNewUser({
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
  makeEmployeeAnAdmin = async (email) => {
    this.setState({
      loading: true,
      addNew: false,
    });
    try {
      await this.props.makeEmployeeAnAdmin({
        variables: {
          email,
        },
        refetchQueries: [
          {
            query: customerAdminsQuery,
            variables: {customerId: this.props.customer.id},
          },
        ],
      });
    } catch (err) {
      this.setState({
        loading: false,
        errors: [err.message],
      });
    }
    //
    this.setState({
      addNew: false,
      loading: false,
    });
  };
  onSaveUser = async (newValues) => {
    this.setState({
      loading: true,
    });
    try {
      await this.props.saveUser({
        variables: {
          id: this.state.selected.id,
          params: {
            ...newValues,
            //roles: this.state.selected
            //  ? this.state.selected.roles
            //  : ['coAdmin'],
            customerId: this.props.customer.id,
          },
        },
        refetchQueries: [
          {
            query: customerAdminsQuery,
            variables: {customerId: this.props.customer.id},
          },
        ],
      });
      message.success('User successfully saved');
      this.setState({addNew: false, selected: false, loading: false});
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
        errors: [err.message],
      });
    }
  };
  render() {
    // if user clicks "create user" button, we'll show the form for creating an user
    if (this.state.addNew) {
      return (
        <React.Fragment>
          <UserForm
            onSubmit={this.onCreateUser}
            loading={this.state.loading}
            makeEmployeeAnAdmin={this.makeEmployeeAnAdmin}
            onCancel={() => this.setState({addNew: false})}
          />
          {this.state.errors && this.state.errors.length > 0 && (
            <ErrorBlock errors={this.state.errors} />
          )}
        </React.Fragment>
      );
    }

    /**
     * if the user selects an item from the table,
     * we'll show their selection in the form so they can edit it
     */
    if (this.state.selected) {
      return (
        <React.Fragment>
          <UserForm
            onSubmit={this.onSaveUser}
            loading={this.state.loading}
            onCancel={() => this.setState({selected: false})}
            {...this.state.selected}
          />
          {this.state.errors && this.state.errors.length > 0 && (
            <ErrorBlock errors={this.state.errors} />
          )}
        </React.Fragment>
      );
    }

    /**
     * By default we'll show the users table
     */
    return (
      <div style={{width: 900, maxWidth: '100%', position: 'relative'}}>
        <Query
          query={customerAdminsQuery}
          fetchPolicy="cache-and-network"
          variables={{customerId: this.props.customer.id}}
        >
          {({error, loading, data}) => {
            if (loading) return <Loading />;
            if (error) return 'error';
            return (
              <UsersTable
                dataSource={data.customerAdmins}
                onClick={(selected) => this.setState({selected})}
              />
            );
          }}
        </Query>{' '}
        <Button
          style={{
            width: 120,
            marginTop: 16,
          }}
          onClick={() => this.setState({addNew: true})}
        >
          Create User
        </Button>
      </div>
    );
  }
}

export default compose(
  graphql(saveUser, {name: 'saveUser'}),
  graphql(createNewUser, {name: 'createNewUser'}),
  graphql(makeEmployeeAnAdmin, {name: 'makeEmployeeAnAdmin'})
)(Users);
