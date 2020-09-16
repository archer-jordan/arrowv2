import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
// COMPONENTS
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

const Text = styled.span`
  font-weight: 600;
  color: #0f466a;
  font-family: ${(p) => p.theme.fontFamily};
`;

export default ({handleTableChange, current, total, loading, dataSource}) => {
  const columns = [
    {
      title: 'LAST NAME',
      key: 'id',
      render: (record) => (
        <Link to={`/admin/partners/${record.id}`}>{record.lastName}</Link>
      ),
    },
    {
      title: 'FIRST NAME',
      render: (record) => record.firstName,
    },
    {
      title: 'PARTNER VIEW',
      render: () => 'Partner View',
    },
    {
      title: 'STATUS',
      render: (record) => helpers.capitalize(record.status),
    },
    {
      title: 'APPLICATION SUBMITTED',
      render: (record) =>
        moment(parseInt(record.applicationSubmittedDate)).format('MM/DD/YYYY'),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
      loading={loading}
    />
  );
};
