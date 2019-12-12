import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import styled from 'styled-components';
import moment from 'moment';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

class MessagesTable extends React.PureComponent {
  render() {
    const {loading, dataSource} = this.props;

    const columns = [
      {
        title: 'Email',
        render: (text, record) => <Text>{record.email}</Text>,
      },
      {
        title: 'Subject',
        render: (text, record) => <Text>{record.subject}</Text>,
      },
      {
        title: 'Message',
        render: (text, record) => <Text>{record.message}</Text>,
      },
      {
        title: 'Created',
        render: (text, record) => (
          <Text>
            {record.createdAt && moment(record.createdAt).format('M/D/YY')}
          </Text>
        ),
      },
    ];

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
          total: dataSource.length,
        }}
        rowKey="id"
        loading={loading}
      />
    );
  }
}

export default MessagesTable;