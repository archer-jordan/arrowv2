import React from 'react';
import moment from 'moment';
// COMPONENTS
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';

export default ({handleTableChange, current, total, loading, dataSource}) => {
  const columns = [
    {
      title: 'COMPANY',
      key: 'id',
      render: (record) => record.title,
    },
    {
      title: 'ACTIVATION',
      render: (record) =>
        record.referralStartDate &&
        moment(parseInt(record.referralStartDate)).format('MM/DD/YYYY'),
    },
    {
      title: 'TERMINATION',
      render: (record) =>
        record.referralEndDate &&
        moment(parseInt(record.referralEndDate)).format('MM/DD/YYYY'),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
      pagination={{position: ['none', 'none']}} // will not show any pagination at the bottom
      loading={loading}
    />
  );
};
