import React from 'react';
import Table from 'antd/lib/table';
import Popover from 'components/common/Popover';
import Icon from 'components/common/Icon';
import 'antd/lib/table/style/css';
import styled from 'styled-components';
import moment from 'moment';
// APOLLO
import updateSupportStatus from 'ApolloClient/Mutations/updateSupportStatus';
import {graphql} from 'react-apollo';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

const StatusText = styled(Text)`
  color: ${p => (p.open ? '#0f466a' : p.theme.colors.neutral6)};
`;

const Option = styled.div`
  font-weight: 600;
  margin-top: 8px;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
  cursor: pointer;
`;

const ActiveDot = styled.span`
  height: 10px;
  width: 10px;
  display: inline-block;
  background: ${p => (p.active ? p.theme.colors.support2 : '#fff')};
  border-radius: 50%;
  margin-right: 4px;
`;

class MessagesTable extends React.PureComponent {
  onStatusChange = async (id, status) => {
    try {
      await this.props.updateSupportStatus({
        variables: {
          id,
          status,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const {loading, dataSource, total, current, onPageChange} = this.props;
    const columns = [
      {
        title: 'Email',
        key: 'id',
        render: (text, record) => <Text>{record.email}</Text>,
      },
      {
        title: 'REQUEST ID',
        render: (text, record) => <Text>{record.id}</Text>,
      },
      // {
      //   title: 'Subject',
      //   render: (text, record) => <Text>{record.subject}</Text>,
      // },
      // {
      //   title: 'Message',
      //   render: (text, record) => <Text>{record.message}</Text>,
      // },
      {
        title: 'Type',
        render: (text, record) => <Text>{record.messageType}</Text>,
      },
      {
        title: 'Customer',
        render: (text, record) => (
          <Text>{record.customer && record.customer.title}</Text>
        ),
      },
      {
        title: 'Status',
        width: 95,
        render: (text, record) => {
          return (
            <Popover
              placement="bottom"
              content={
                <div style={{width: 100, height: 75}}>
                  <Option
                    onClick={() => this.onStatusChange(record.id, 'open')}
                    active={record.status === 'open'}
                  >
                    <ActiveDot active={record.status === 'open'} />
                    Open
                  </Option>
                  <Option
                    onClick={() => this.onStatusChange(record.id, 'closed')}
                    active={record.status === 'closed'}
                  >
                    {' '}
                    <ActiveDot active={record.status === 'closed'} />
                    Closed
                  </Option>
                </div>
              }
            >
              <StatusText
                style={{cursor: 'pointer'}}
                open={record.status === 'open'}
              >
                <Icon type="down" style={{marginRight: 4, fontSize: 10}} />
                {record.status}
              </StatusText>
            </Popover>
          );
        },
      },
      {
        title: 'Created',
        render: (text, record) => (
          <Text>
            {record.createdAt &&
              moment(parseInt(record.createdAt)).format('M/D/YY')}
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
          total,
          current: current || 1,
          onChange: (page, pageSize) => onPageChange(page),
        }}
        rowKey="id"
        loading={loading}
        onChange={this.props.handleTableChange}
      />
    );
  }
}

export default graphql(updateSupportStatus, {name: 'updateSupportStatus'})(
  MessagesTable
);
