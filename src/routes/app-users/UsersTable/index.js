import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import styled from 'styled-components';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

const DEFAULT_COLUMNS = [
  {
    title: 'Last Name',
    dataIndex: 'id',
    key: 'id',
    render: (text, record) => <Text>{record.lastName}</Text>,
  },
  {
    title: 'First Name',
    render: (text, record) => <Text>{record.firstName}</Text>,
  },
  {
    title: 'Email',
    render: (text, record) => <Text>{record.email}</Text>,
  },
];

class UsersTable extends React.PureComponent {
  render() {
    const {total, loading, dataSource, columns} = this.props;
    return (
      <div style={{position: 'relative'}}>
        <Table
          dataSource={dataSource}
          columns={columns || DEFAULT_COLUMNS}
          pagination={{
            pageSize: 5,
            total,
          }}
          loading={loading}
        />{' '}
      </div>
    );
  }
}

export default UsersTable;
