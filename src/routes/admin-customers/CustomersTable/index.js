import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
// APOLLO
import impersonateCustomer from 'ApolloClient/Mutations/impersonateCustomer';
import currentUser from 'ApolloClient/Queries/currentUser';
import {graphql} from 'react-apollo';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

const PinkText = styled(Text)`
  color: ${p => p.theme.colors.support1};
`;

const MockTableHeaderBackground = styled.div`
  background: blue;
  height: 50px;
  position: absolute;
  z-index: 1000;
  top: 0;
`;

class CustomersTable extends React.PureComponent {
  state = {
    impersonating: false,
  };
  onImpersonateCustomer = async customerId => {
    try {
      this.setState({
        impersonating: customerId,
      });
      await this.props.impersonateCustomer({
        variables: {
          customerId,
        },
        refetchQueries: [{query: currentUser}],
      });
      setTimeout(() => {
        this.props.history.push(`/reports`);
      }, 750);
    } catch (err) {
      this.setState({
        impersonating: false,
      });
      console.log(err);
    }
  };
  render() {
    const {
      history,
      loading,
      dataSource,
      total,
      current,
      onPageChange,
    } = this.props;

    const columns = [
      {
        title: 'Company Name',
        key: 'title',
        sorter: () => {},
        render: (text, record) => (
          <PinkText
            onClick={() => history.push(`/admin/customers/${record.id}`)}
          >
            {record.title}
          </PinkText>
        ),
      },
      {
        title: 'ID',
        key: 'assignedId',
        sorter: () => {},
        render: (text, record) => <Text>{record.assignedId || 'N/A'}</Text>,
      },
      {
        title: 'Status',
        key: 'status',
        sorter: () => {},
        render: (text, record) => <Text>{record.status}</Text>,
      },
      {
        title: '',
        render: record => {
          return (
            <PinkText onClick={() => this.onImpersonateCustomer(record.id)}>
              {this.state.impersonating === record.id ? (
                <Icon type="loading" />
              ) : (
                'CUSTOMER VIEW'
              )}
            </PinkText>
          );
        },
      },
    ];

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
          total,
          current: current || 1,
          onChange: (page, pageSize) => onPageChange(page),
        }}
        rowKey="id"
        loading={loading}
        onChange={this.props.handleTableChange}
        onRow={(record, rowIndex) => {
          return {
            //onClick: event => {}, // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
      />
    );
  }
}

export default graphql(impersonateCustomer, {name: 'impersonateCustomer'})(
  CustomersTable
);
