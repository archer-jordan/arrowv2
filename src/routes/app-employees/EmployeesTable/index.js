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
    width: 100,
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
  },
];

class EmployeesTable extends React.PureComponent {
  render() {
    return (
      <div style={{marginTop: 56}}>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default EmployeesTable;
