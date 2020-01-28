import React from 'react';
import Select from '../SelectInput';
import styled from 'styled-components';
// APOLLO
import {Query} from 'react-apollo';
import customersQuery from 'ApolloClient/Queries/customers';

const {Option} = Select;

const Wrapper = styled.div`
  .ant-select-selection__rendered,
  .ant-select-selection,
  .ant-select-selection--single {
    background: #ebf2f7 !important;
    border: 0px !important;
    height: 50px;
  }
  .ant-select-selection-selected-value {
    height: 50px;
    display: flex !important;
    align-items: center !important;
  }
`;

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
            <Wrapper>
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
            </Wrapper>
          );
        }}
      </Query>
    );
  }
}

export default CustomerDropdown;
