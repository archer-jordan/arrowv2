import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import styled from 'styled-components';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

const PinkText = styled(Text)`
  color: ${p => p.theme.colors.support1};
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
