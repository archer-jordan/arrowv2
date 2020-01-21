import React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import message from 'components/common/message';
import TextInput from 'components/inputs/TextInput';
import UsersTable from './UsersTable';
import ErrorBlock from 'components/common/ErrorBlock';
import UserForm from 'components/forms/UserForm';
// APOLLO
import usersQuery from 'ApolloClient/Queries/users';
import {Query, graphql} from 'react-apollo';
import saveUser from 'ApolloClient/Mutations/saveUser';
import compose from 'lodash/flowRight';
import createNewUser from 'ApolloClient/Mutations/createNewUser';

const Container = styled.div`
  width: 950px;
  margin: auto;
  max-width: 100%;
`;

const ClearSearch = ({onClick}) => (
  <div onClick={onClick} style={{position: 'absolute', right: 20, bottom: 7}}>
    <Icon type="close-circle" style={{color: '#999', cursor: 'pointer'}} />
  </div>
);

class AppUsers extends React.PureComponent {
  state = {
    searchText: null,
    searchString: null,
    skip: 0,
    downloading: false,
    errors: [],
    addNew: false,
  };
  onSearch = () => {
    this.setState({
      searchText: this.state.searchString,
    });
  };
  onSaveUser = async values => {
    try {
      this.setState({
        loading: true,
      });
      await this.props.saveUser({
        variables: {
          id: this.state.selected.id,
          params: {
            ...values,
          },
        },
        refetchQueries: [
          {
            query: usersQuery,
            variables: {
              customerId: this.props.currentUser.customerId,
              searchText: this.state.searchText,
            },
          },
        ],
      });
      message.success('User successfully saved');
      this.setState({
        loading: false,
        selected: false,
      });
    } catch (err) {
      return this.setState({
        errors: [err.message],
      });
    }
  };
  onCreateUser = async newValues => {
    this.setState({
      loading: true,
    });
    try {
      let params = {
        ...newValues,
        roles: ['coAdmin'],
        customerId: this.props.currentUser.company.id,
      };
      await this.props.createNewUser({
        variables: {
          params,
        },
        refetchQueries: [
          {
            query: usersQuery,
            variables: {
              customerId: this.props.currentUser.customerId,
              searchText: this.state.searchText,
            },
          },
        ],
      });
      message.success('User successfully created!');
      this.setState({addNew: false, loading: false});
    } catch (err) {
      console.log(err);
    }
  };
  makeEmployeeAnAdmin = async email => {
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
            query: usersQuery,
            variables: {
              customerId: this.props.currentUser.customerId,
              searchText: this.state.searchText,
            },
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
  render() {
    // if curretn user is an employee, we'll re-route them because they automatically can't view employee data
    if (!this.props.currentUser.roles) {
      return <Redirect to="/account?tab=profile" />;
    }
    if (
      !this.props.currentUser.roles.includes('coAdmin') &&
      this.props.currentUser.roles.includes('coEmployee')
    ) {
      return <Redirect to="/account?tab=profile" />;
    }

    // If user is a company admin but does not have persmission to edit users, we will re-route them from this tab
    if (
      this.props.currentUser.roles.includes('coAdmin') &&
      !this.props.currentUser.permissions.includes('manageUsers')
    ) {
      return <Redirect to="/account?tab=profile" />;
    }

    // if user clicks "create user" button, we'll show the form for creating an user
    if (this.state.addNew) {
      return (
        <Container>
          <UserForm
            onSubmit={this.onCreateUser}
            loading={this.state.loading}
            makeEmployeeAnAdmin={this.makeEmployeeAnAdmin}
            onCancel={() => this.setState({addNew: false})}
          />
          {this.state.errors && this.state.errors.length > 0 && (
            <ErrorBlock errors={this.state.errors} />
          )}
        </Container>
      );
    }

    /**
     * if the user selects an item from the table,
     * we'll show their selection in the form so they can edit it
     */
    if (this.state.selected) {
      return (
        <Container>
          <UserForm
            onSubmit={this.onSaveUser}
            loading={this.state.loading}
            onCancel={() => this.setState({selected: false})}
            {...this.state.selected}
          />
          {this.state.errors && this.state.errors.length > 0 && (
            <ErrorBlock errors={this.state.errors} />
          )}
        </Container>
      );
    }

    return (
      <Container>
        <Row gutter={16} style={{marginTop: 24}}>
          {' '}
          <Col xs={18}>
            <div style={{position: 'relative'}}>
              {' '}
              <TextInput
                dark
                width={'700px'}
                value={this.state.searchString}
                label="search by name, email or ID#"
                onChange={e => this.setState({searchString: e.target.value})}
              />
              {this.state.searchText && (
                <ClearSearch
                  onClick={() =>
                    this.setState({searchString: '', searchText: null})
                  }
                />
              )}
            </div>
          </Col>
          <Col xs={3}>
            {' '}
            <Button secondary style={{width: 90}} onClick={this.onSearch}>
              search
            </Button>
          </Col>
          <Col xs={3}>
            <Button
              style={{width: 105}}
              onClick={() => this.setState({addNew: true})}
            >
              + New User
            </Button>
          </Col>
        </Row>
        <Query
          query={usersQuery}
          variables={{
            customerId: this.props.currentUser.customerId,
            searchText: this.state.searchText,
          }}
        >
          {({data, loading, error}) => {
            if (error) return 'error';
            return (
              <UsersTable
                history={this.props.history}
                loading={loading}
                onSelect={selected => this.setState({selected})}
                dataSource={!loading ? data.users.users : []}
              />
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default compose(
  graphql(saveUser, {name: 'saveUser'}),
  graphql(createNewUser, {name: 'createNewUser'})
)(AppUsers);
