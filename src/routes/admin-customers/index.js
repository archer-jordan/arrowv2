import React from 'react';
// APOLLO
import {Query, graphql} from 'react-apollo';
import saveCustomer from 'ApolloClient/Mutations/saveCustomer';
import customersQuery from 'ApolloClient/Queries/customers';
// COMPONENTS
import CustomerForm from 'components/forms/CustomerForm';
import Loading from 'components/common/Loading';
import Row from 'components/common/Row';
import TextInput from 'components/inputs/TextInput';
import Col from 'components/common/Col';
import message from 'components/common/message';
import Button from 'components/common/Button';
import CustomersTable from './CustomersTable';

class AdminHome extends React.PureComponent {
  state = {
    addNew: false,
    loading: false,
    searchText: '',
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
      <div style={{width: 900, margin: 'auto', maxWidth: '100%'}}>
        <Row style={{marginTop: 24}}>
          {' '}
          <Col xs={16}>
            <TextInput
              dark
              width={'700px'}
              onChange={e => this.setState({searchText: e.target.value})}
              label="search by name or ID#"
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
          variables={{searchText: this.state.searchText}}
        >
          {({data, loading, error}) => {
            if (loading) return <Loading />;
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
