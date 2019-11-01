import React from 'react';
// APOLLO
import {Query, graphql} from 'react-apollo';
import saveCustomer from 'ApolloClient/Mutations/saveCustomer';
import customersQuery from 'ApolloClient/Queries/customers';
// COMPONENTS
import CustomerForm from 'components/forms/CustomerForm';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import message from 'components/common/message';
import Button from 'components/common/Button';
import CustomersTable from './CustomersTable';

class AdminHome extends React.PureComponent {
  state = {
    addNew: false,
    loading: false,
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
      <div>
        <Row style={{marginBottom: 24}}>
          {' '}
          <Col xs={16}></Col>
          <Col xs={4}></Col>
          <Col xs={4}>
            <Button onClick={() => this.setState({addNew: true})}>
              + New Customer
            </Button>
          </Col>
        </Row>
        <Query query={customersQuery}>
          {({data, loading, error}) => {
            if (loading) return 'loading';
            if (error) return 'error';
            if (data.customers.count === 0) return 'No customers';
            return (
              <CustomersTable
                history={this.props.history}
                dataSource={data.customers.customers}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default graphql(saveCustomer, {name: 'saveCustomer'})(AdminHome);
