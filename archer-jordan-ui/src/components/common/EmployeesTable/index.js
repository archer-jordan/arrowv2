import React from 'react';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
import moment from 'moment';
import styled from 'styled-components';

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${(p) => p.theme.fontFamily};
`;

const TextLink = styled(Text)`
  font-weight: 600;
  font-family: ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.colors.support2};
  cursor: pointer;
`;

class EmployeesTable extends React.PureComponent {
  render() {
    const {
      total,
      loading,
      current,
      dataSource,
      extraColumns,
      onPageChange,
      onClickEmployee,
    } = this.props;

    const columns = [
      {
        title: 'ID',
        key: 'assignedId',
        sorter: () => {},
        width: 25,
        render: (text, record) => (
          <TextLink onClick={() => onClickEmployee(record)}>
            {record.assignedId}
          </TextLink>
        ),
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
        render: (record) => (
          <Text>
            {record.hireDate
              ? moment(parseInt(record.hireDate)).format('M-D-YYYY')
              : 'N/A'}
          </Text>
        ),
      },
    ];

    return (
      <div style={{position: 'relative'}}>
        <Table
          dataSource={dataSource}
          columns={[...columns, ...extraColumns]}
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

EmployeesTable.defaultProps = {
  extraColumns: [],
};

export default EmployeesTable;
