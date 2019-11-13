import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import moment from 'moment';
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
    width: 100,
    render: record => (
      <Text>
        {record.hireDate
          ? moment(parseInt(record.hireDate)).format('M-D-YYYY')
          : 'N/A'}
      </Text>
    ),
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
    const {
      history,
      total,
      loading,
      current,
      dataSource,
      onPageChange,
    } = this.props;
    return (
      <div style={{position: 'relative'}}>
        <MockTableHeaderBackground />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 5,
            total,
            current: current || 1,
            onChange: (page, pageSize) => onPageChange(page),
          }}
          loading={loading}
          onChange={(pagination, filters, sorter) =>
            console.log(pagination, filters, sorter)
          }
          onRow={(record, rowIndex) => {
            return {
              onClick: event => history.push(`/employees/${record.id}`), // click row
            };
          }}
        />{' '}
      </div>
    );
  }
}

export default EmployeesTable;
