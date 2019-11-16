import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import styled from 'styled-components';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

const columns = [
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
    const {dataSource, onClick} = this.props;
    return (
      <div style={{position: 'relative'}}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => onClick(record), // click row
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

export default UsersTable;
