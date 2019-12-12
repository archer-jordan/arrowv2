import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import styled from 'styled-components';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

class UsersTable extends React.PureComponent {
  render() {
    const {loading, total, dataSource} = this.props;

    const columns = [
      {
        title: 'Email',
        render: (text, record) => <Text>{record.email}</Text>,
      },
      {
        title: 'First Name',
        render: (text, record) => <Text>{record.firstName}</Text>,
      },
      {
        title: 'Last Name',
        render: (text, record) => <Text>{record.lastName}</Text>,
      },
    ];

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
          total: total,
        }}
        rowKey="id"
        loading={loading}
      />
    );
  }
}

export default UsersTable;
