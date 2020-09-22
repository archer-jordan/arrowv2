import React from 'react';
import moment from 'moment';
// COMPONENTS
import Loading from 'components/common/Loading';
import Table from 'components/common/Table';
// APOLLO
import REFERRAL_PROFILE from 'ApolloClient/Queries/referralProfile';
import {useQuery} from 'react-apollo';

export default () => {
  const {loading, error, data} = useQuery(REFERRAL_PROFILE);
  if (loading) return <Loading />;
  if (error) return 'error';
  let customers =
    data &&
    data.currentUser &&
    data.currentUser.referralProfile &&
    data.currentUser.referralProfile.customers;

  const columns = [
    {
      key: 'id',
      title: 'Customer',
      render: ({title}) => title,
    },
    {
      title: 'Start Date',
      render: ({referralStartDate}) =>
        moment(parseInt(referralStartDate)).format('MM/DD/YYYY'),
    },
    {
      title: 'Stop Date',
      render: ({referralEndDate}) =>
        moment(parseInt(referralEndDate)).format('MM/DD/YYYY'),
    },
    {
      title: 'Reports',
      render: () => 'View Reports',
    },
  ];
  return (
    <div style={{marginTop: 32}}>
      <Table
        dataSource={customers}
        columns={columns}
        pagination={{
          pageSize: 5,
          total: customers.length || 0,
        }}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};
