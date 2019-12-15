import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
import Popconfirm from 'components/common/Popconfirm';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

const Clickable = styled(Text)`
  color: ${p => p.theme.colors.support1};
`;

const RemoveBtn = styled.div`
  text-align: center;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #666;
  }
`;

class ContactsTable extends React.PureComponent {
  render() {
    const {dataSource, onClick, onRemove} = this.props;
    const columns = [
      {
        title: 'Last Name',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
          <Clickable onClick={() => onClick(record)}>
            {record.lastName}
          </Clickable>
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
      {
        title: 'Phone',
        render: (text, record) => <Text>{record.phone}</Text>,
      },
      {
        title: 'Title',
        render: (text, record) => <Text>{record.title}</Text>,
      },
      {
        title: 'Actions',
        render: (text, record) => (
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => onRemove(record.id)}
            okText="Yes"
          >
            <RemoveBtn>
              <Icon type="delete" style={{marginRight: 4}} />
              Remove
            </RemoveBtn>
          </Popconfirm>
        ),
      },
    ];
    return (
      <div style={{position: 'relative'}}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey="id"
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {}, // click row
              onDoubleClick: event => {}, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />{' '}
      </div>
    );
  }
}

export default ContactsTable;
