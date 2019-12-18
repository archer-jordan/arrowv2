import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import styled from 'styled-components';
import moment from 'moment';
import Popconfirm from 'components/common/Popconfirm';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

const DateText = styled(Text)`
  color: ${p => p.theme.colors.neutral7};
  font-weight: 500;
`;

const DeleteText = styled(Text)`
  color: ${p => p.theme.colors.neutral6};
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
      {
        title: 'Created by',
        render: (text, record) => (
          <Text>
            {record.createdByEmail}{' '}
            <DateText>
              {record.createdAt &&
                `Created on ${moment(parseInt(record.createdAt)).format(
                  'M/D/YY'
                )}`}
            </DateText>
          </Text>
        ),
      },
      {
        title: 'Delete',
        render: (text, record) => (
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => this.props.onDeleteUser(record.id)}
            okText="Yes I'm sure."
          >
            <DeleteText>DELETE</DeleteText>
          </Popconfirm>
        ),
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
