import React from 'react';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import TextInput from 'components/inputs/TextInput';
import UsersTable from './UsersTable';
// APOLLO
// APOLLO
import usersQuery from 'ApolloClient/Queries/users';
import {Query} from 'react-apollo';

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
    return (
      <div style={{width: 900, margin: 'auto', maxWidth: '100%'}}>
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
                <div
                  onClick={() =>
                    this.setState({searchString: '', searchText: null})
                  }
                  style={{position: 'absolute', right: 20, bottom: 7}}
                >
                  <Icon
                    type="close-circle"
                    style={{color: '#999', cursor: 'pointer'}}
                  />
                </div>
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
      </div>
    );
  }
}

export default AppUsers;
