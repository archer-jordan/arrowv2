import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import moment from 'moment';
import styled from 'styled-components';

// const dataSource = [
//   {
//     id: '1',
//     key: '1',
//     assignedId: '123',
//     firstName: 'Anthony',
//     lastName: 'Comito',
//     hireDate: moment().valueOf(),
//   },
// ];

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
    title: 'Company Name',
    dataIndex: 'id',
    key: 'id',
    render: (text, record) => <TextLink>{record.title}</TextLink>,
  },
  {
    title: 'ID',
    render: (text, record) => <Text>{record.id}</Text>,
  },
  {
    title: 'Status',
    render: (text, record) => <Text>{record.status}</Text>,
  },
];

const MockTableHeaderBackground = styled.div`
  background: blue;
  height: 50px;
  position: absolute;
  z-index: 1000;
  top: 0;
`;

class CustomersTable extends React.PureComponent {
  render() {
    const {history, dataSource} = this.props;
    return (
      <div style={{position: 'relative'}}>
        <MockTableHeaderBackground />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => history.push(`/admin/customers/${record.id}`), // click row
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

export default CustomersTable;
