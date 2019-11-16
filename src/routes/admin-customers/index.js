import React from 'react';
// APOLLO
import {Query, graphql} from 'react-apollo';
import saveCustomer from 'ApolloClient/Mutations/saveCustomer';
import customersQuery from 'ApolloClient/Queries/customers';
// COMPONENTS
import CustomerForm from 'components/forms/CustomerForm';
import Row from 'components/common/Row';
import TextInput from 'components/inputs/TextInput';
import Col from 'components/common/Col';
import message from 'components/common/message';
import Button from 'components/common/Button';
import CustomersTable from './CustomersTable';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

class AdminHome extends React.PureComponent {
  state = {
    addNew: false,
    loading: false,
    searchText: '',
    skip: 0,
    current: 1,
    sortBy: 'titleAscend',
  };
  onCreateCustomer = async values => {
    try {
      this.setState({
        loading: true,
      });
      let res = await this.props.saveCustomer({
        variables: {
          params: {
            ...values,
          },
        },
        refetchQueries: [
          {
            query: customersQuery,
            variables: {searchText: this.state.searchText},
          },
        ],
      });
      this.setState({
        addNew: false,
        loading: false,
      });
      message.success('New customer created!');
      this.props.history.push(`/admin/customers/${res.data.saveCustomer.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter.order);
    if (sorter.order) {
      let sortBy = `${sorter.columnKey}${helpers.capitalize(sorter.order)}`;
      this.setState({sortBy});
    }
  };
  render() {
    if (this.state.addNew) {
      return (
        <CustomerForm
          onSubmit={this.onCreateCustomer}
          loading={this.state.loading}
          onCancel={() => this.setState({addNew: false})}
          buttonText="Create Customer"
        />
      );
    }
    return (
      <div style={{width: 900, margin: 'auto', maxWidth: '100%'}}>
        <Row style={{marginTop: 24}}>
          {' '}
          <Col xs={16}>
            <TextInput
              dark
              width={'700px'}
              onChange={e => this.setState({searchText: e.target.value})}
              label="search by name or ID#"
              value={this.state.searchText}
            />
          </Col>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Button onClick={() => this.setState({addNew: true})}>
              + New Customer
            </Button>
          </Col>
        </Row>

        <Query
          query={customersQuery}
          variables={{
            searchText: this.state.searchText,
            skip: this.state.skip,
            sortBy: this.state.sortBy,
          }}
        >
          {({data, loading, error}) => {
            if (error) return 'error';
            return (
              <CustomersTable
                history={this.props.history}
                dataSource={!loading ? data.customers.customers : []}
                total={!loading ? data.customers.count : null}
                handleTableChange={this.handleTableChange}
                onPageChange={page =>
                  this.setState({
                    skip: page === 1 ? 0 : (page - 1) * 5,
                    current: page,
                  })
                }
                current={this.state.current}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default graphql(saveCustomer, {name: 'saveCustomer'})(AdminHome);
