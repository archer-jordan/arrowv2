import React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import TextInput from 'components/inputs/TextInput';
import UsersTable from './UsersTable';
// APOLLO
import usersQuery from 'ApolloClient/Queries/users';
import {Query} from 'react-apollo';

const Container = styled.div`
  width: 900px;
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
  };
  onSearch = () => {
    this.setState({
      searchText: this.state.searchString,
    });
  };
  render() {
    // if curretn user is an employee, we'll re-route them because they automatically can't view employee data
    if (
      !this.props.currentUser.roles ||
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
            <Button style={{width: 90}} onClick={this.onSearch}>
              search
            </Button>
          </Col>
          <Col xs={3}></Col>
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
                dataSource={!loading ? data.users.users : []}
              />
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default AppUsers;
