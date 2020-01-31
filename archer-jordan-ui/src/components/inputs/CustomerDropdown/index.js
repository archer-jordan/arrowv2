import React from 'react';
import Select from '../SelectInput';
// APOLLO
import {Query} from 'react-apollo';
import customersQuery from 'ApolloClient/Queries/customers';
import DropdownStyleWrapper from '../DropdownStyleWrapper';

const {Option} = Select;

class CustomerDropdown extends React.PureComponent {
  render() {
    return (
      <Query
        query={customersQuery}
        variables={{
          limit: 1000,
          skip: 0,
        }}
      >
        {({data, loading, error}) => {
          if (loading) return null;
          if (error) return null;
          return (
            <DropdownStyleWrapper>
              <Select
                value={this.props.value}
                style={{width: '100%'}}
                onChange={this.props.onChange}
              >
                <Option value={null}>All Customers</Option>
                {data.customers.customers.map(customer => {
                  return (
                    <Option value={customer.id} key={customer.id}>
                      {customer.title}
                    </Option>
                  );
                })}
              </Select>
            </DropdownStyleWrapper>
          );
        }}
      </Query>
    );
  }
}

export default CustomerDropdown;
