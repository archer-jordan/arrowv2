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

const MockTableHeaderBackground = styled.div`
  background: blue;
  height: 50px;
  position: absolute;
  z-index: 1000;
  top: 0;
`;

const columns = [
  {
    title: 'ID',
    key: 'assignedId',
    sorter: () => {},
    width: 25,
    render: (text, record) => <TextLink>{record.assignedId}</TextLink>,
  },
  {
    title: 'Last Name',
    key: 'lastName',
    sorter: () => {},
    width: 100,
    render: (text, record) => <Text>{record.lastName}</Text>,
  },
  {
    title: 'First Name',
    key: 'firstName',
    sorter: () => {},
    width: 100,
    render: (text, record) => <Text>{record.firstName}</Text>,
  },
  {
    title: 'Hire Date',
    width: 100,
    key: 'hireDate',
    sorter: () => {},
    render: record => (
      <Text>
        {record.hireDate
          ? moment(parseInt(record.hireDate)).format('M-D-YYYY')
          : 'N/A'}
      </Text>
    ),
  },
];

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
          rowKey="id"
          pagination={{
            pageSize: 5,
            total,
            current: current || 1,
            onChange: (page, pageSize) => onPageChange(page),
          }}
          loading={loading}
          onChange={this.props.handleTableChange}
          onRow={this.props.onRow}
        />{' '}
      </div>
    );
  }
}

export default EmployeesTable;
