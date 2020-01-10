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
    const {total, loading, dataSource, columns} = this.props;
    const DEFAULT_COLUMNS = [
      {
        title: 'Last Name',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
          <Text onClick={() => this.props.onSelect(record)}>
            {record.lastName}
          </Text>
        ),
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
    return (
      <div style={{position: 'relative'}}>
        <Table
          dataSource={dataSource}
          columns={columns || DEFAULT_COLUMNS}
          pagination={{
            pageSize: 5,
            total,
          }}
          rowKey="id"
          loading={loading}
        />{' '}
      </div>
    );
  }
}

export default UsersTable;
