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
    title: 'Company Name',
    dataIndex: 'id',
    key: 'id',
    render: (text, record) => <Text>{record.title}</Text>,
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
