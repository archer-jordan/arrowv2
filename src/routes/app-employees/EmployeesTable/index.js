import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import moment from 'moment';

const dataSource = [
  {
    key: '1',
    firtName: 'Anthony',
    lastName: 'Anthony',
    hireDate: moment().valueOf(),
  },
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
    width: 25,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: 100,
  },
  {
    title: 'First Name',
    dataIndex: 'firtName',
    key: 'firtName',
    width: 100,
  },
  {
    title: 'Hire Date',
    dataIndex: 'hireDate',
    key: 'hireDate',
    width: 100,
    render: record => moment(record.hireDate).format('M/D/YY'),
  },
];

class EmployeesTable extends React.PureComponent {
  render() {
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: event =>
                this.props.history.push(`/employees/${record.id}`), // click row
              onDoubleClick: event => {}, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />
      </div>
    );
  }
}

export default EmployeesTable;
