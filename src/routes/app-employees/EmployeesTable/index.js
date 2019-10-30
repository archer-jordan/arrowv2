import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import moment from 'moment';
import styled from 'styled-components';

const dataSource = [
  {
    id: '1',
    key: '1',
    assignedId: '123',
    firstName: 'Anthony',
    lastName: 'Comito',
    hireDate: moment().valueOf(),
  },
];

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
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
    width: 25,
    render: (text, record) => <TextLink>{record.assignedId}</TextLink>,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: 100,
    render: (text, record) => <Text>{record.lastName}</Text>,
  },
  {
    title: 'First Name',
    dataIndex: 'firtName',
    key: 'firtName',
    width: 100,
    render: (text, record) => <Text>{record.firstName}</Text>,
  },
  {
    title: 'Hire Date',
    dataIndex: 'hireDate',
    key: 'hireDate',
    width: 100,
    render: record => <Text>{moment(record.hireDate).format('M-D-YYYY')}</Text>,
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
    const {history} = this.props;
    return (
      <div style={{position: 'relative'}}>
        <MockTableHeaderBackground />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => history.push(`/employees/${record.id}`), // click row
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
