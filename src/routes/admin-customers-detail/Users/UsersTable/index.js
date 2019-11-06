import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import styled from 'styled-components';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

const TextLink = styled(Link)`
  font-weight: 600;
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
    render: (text, record) => <TextLink>{record.email}</TextLink>,
  },
];

const MockTableHeaderBackground = styled.div`
  background: blue;
  height: 50px;
  position: absolute;
  z-index: 1000;
  top: 0;
`;

class UsersTable extends React.PureComponent {
  render() {
    const {dataSource} = this.props;
    return (
      <div style={{position: 'relative'}}>
        <MockTableHeaderBackground />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
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

export default UsersTable;
