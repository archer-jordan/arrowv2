import React, {useState} from 'react';
import moment from 'moment';
import styled from 'styled-components';
// COMPONENTS
import Loading from 'components/common/Loading';
import Table from 'components/common/Table';
import PartnerReportsTable from 'components/common/PartnerReportsTable';
// APOLLO
import REFERRAL_PROFILE from 'ApolloClient/Queries/referralProfile';
import {useQuery} from 'react-apollo';

const ViewReports = styled.button`
  border: 0px;
  background: transparent;
  cursor: pointer;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.primary3};
  &:focus {
    outline: 0;
  }
`;

export default () => {
  const [viewReports, setViewReports] = useState(null); // holds the customer ID for which we want to see reprots for
  const {loading, error, data} = useQuery(REFERRAL_PROFILE);
  if (loading) return <Loading />;
  if (error) return 'error';
  let customers =
    data &&
    data.currentUser &&
    data.currentUser.referralProfile &&
    data.currentUser.referralProfile.customers;

  if (loading) return null;
  if (error) return error;
  return (
    <PartnerReportsTable partnerId={data.currentUser.referralProfile.id} />
  );

  const columns = [
    {
      key: 'id',
      title: 'Customer',
      render: ({title}) => title,
    },
    {
      title: 'Start',
      render: ({referralStartDate}) =>
        moment(parseInt(referralStartDate)).format('MM/DD/YYYY'),
    },
    {
      title: 'Stop',
      render: ({referralEndDate}) =>
        moment(parseInt(referralEndDate)).format('MM/DD/YYYY'),
    },
    {
      title: 'Reports',
      render: () => (
        <ViewReports onClick={() => setViewReports(true)}>
          View Reports
        </ViewReports>
      ),
    },
  ];
  return (
    <div style={{marginTop: 32}}>
      <Table
        dataSource={customers}
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: 5,
          total: customers.length || 0,
        }}
        rowKey="id"
      />
    </div>
  );
};
