import React, {useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
// COMPONENTS
import Table from 'components/common/Table';
import MonthComponent from 'components/common/MonthComponent/index';
// APOLLO
import {useQuery} from 'react-apollo';
import REFERRAL_REPORTS from 'ApolloClient/Queries/referralReports';

const Total = styled.h2`
  margin: 0px;
  font-weight: 700;
  font-size: 16px;
  margin-right: 24px;
`;

export default ({partnerId}) => {
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [year, setYear] = useState(moment().format('YYYY'));

  const {data, loading, error} = useQuery(REFERRAL_REPORTS, {
    variables: {
      partnerId,
      month: moment(month, 'MMMM').format('M'),
      year,
    },
  });

  if (error) return 'error';

  const getTotal = (reports) => {
    if (!reports) {
      return '$0.00';
    }
    let amounts = reports.map(
      (report) => report.eligibleEmployees * report.rate
    );
    return helpers.centsToDollars(amounts.reduce((a, b) => a + b, 0));
  };

  const columns = [
    {
      key: 'id',
      title: 'Company',
      width: '65%',
      render: ({companyName}) => companyName,
    },
    {
      title: 'Eligible Employees',
      render: ({eligibleEmployees}) => {
        return (
          <div style={{textAlign: 'right', paddingRight: 24}}>
            {eligibleEmployees}
          </div>
        );
      },
      width: '20%',
    },
    {
      title: 'Your Payout',
      render: ({eligibleEmployees, rate}) => {
        return (
          <div style={{textAlign: 'right', paddingRight: 24}}>
            {helpers.centsToDollars(eligibleEmployees * rate)}
          </div>
        );
      },
      width: '15%',
    },
  ];

  const onParamChange = (newValues) => {
    setMonth(newValues.month);
    setYear(newValues.year);
  };

  return (
    <div style={{marginTop: 32}}>
      <MonthComponent year={year} month={month} onChange={onParamChange} />
      <div style={{marginTop: 24}}>
        <Table
          dataSource={(data && data.referralReports) || []}
          columns={columns}
          loading={loading}
          pagination={{
            position: ['none', 'none'],
          }}
          rowKey="id"
        />
      </div>
      <div style={{marginTop: 16, display: 'flex', justifyContent: 'flex-end'}}>
        <Total>TOTAL PAYOUT: {getTotal(data && data.referralReports)}</Total>
      </div>
    </div>
  );
};
