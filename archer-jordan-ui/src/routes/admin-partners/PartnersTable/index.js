import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
// COMPONENTS
import Table from 'components/common/Table';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

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
      title: 'EMAIL',
      render: (record) => record.email,
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
