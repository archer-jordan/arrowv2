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
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text, record) => <Text>{record.assignedId}</Text>,
  },
  {
    title: 'Last Name',
    render: (text, record) => <Text>{record.lastName || 'N/A'}</Text>,
  },
  {
    title: 'First Name',
    render: (text, record) => <Text>{record.firstName || 'N/A'}</Text>,
  },
];

const MockTableHeaderBackground = styled.div`
  background: blue;
  height: 50px;
  position: absolute;
  z-index: 1000;
  top: 0;
`;

class EmployeesTable extends React.PureComponent {
  render() {
    const {history, dataSource, onEdit} = this.props;
    return (
      <div style={{position: 'relative'}}>
        <MockTableHeaderBackground />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => onEdit(record), // history.push(`/admin/employees/${record.id}`), // click row
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

export default EmployeesTable;
