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

const CaptionText = styled(Text)`
  color: ${p => p.theme.colors.neutral6};
  font-weight: 500;
  font-size: 14px;
`;

const DeleteText = styled(Text)`
  color: ${p => p.theme.colors.neutral6};
  cursor: pointer;
  &:hover {
    color: ${p => p.theme.colors.neutral5};
  }
`;

class UsersTable extends React.PureComponent {
  render() {
    const {loading, total, dataSource} = this.props;

    const columns = [
      {
        title: 'Email',
        render: (text, record) => (
          <div>
            <Text>{record.email}</Text>
            <CaptionText>{record.title}</CaptionText>
          </div>
        ),
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
        title: 'Created',
        render: (text, record) => (
          <Text>
            {record.createdByEmail}{' '}
            <CaptionText>
              {record.createdAt &&
                `Created on ${moment(parseInt(record.createdAt)).format(
                  'M/D/YY'
                )}`}
            </CaptionText>
          </Text>
        ),
      },
      {
        title: 'Actions',
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
