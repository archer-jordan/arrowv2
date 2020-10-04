import React, {useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
// COMPONENTS
import Table from 'components/common/Table';
import MonthComponent from 'components/common/MonthComponent';
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
  // id
  // companyName
  // enrollmentWindowStart
  // enrollmentWindowEnd
  // minimumReferralHours
  // referralRate
  const columns = [
    {
      key: 'id',
      title: 'Company',
      width: '25%',
      render: ({companyName}) => companyName,
    },
    {
      title: 'Start',
      render: ({customer}) =>
        moment(parseInt(customer.referralStartDate)).format('MM/DD/YYYY'),
      width: '12.5%',
    },
    {
      title: 'Stop',
      render: ({customer}) =>
        moment(parseInt(customer.referralEndDate)).format('MM/DD/YYYY'),
      width: '12.5%',
    },
    {
      title: 'Minimum Eligibility',
      render: ({customer}) => {
        return `${customer.minimumReferralHours} hours /employee / mo.`;
      },
      width: '20%',
    },
    {
      title: 'Rate',
      render: ({rate}) => {
        return helpers.centsToDollars(rate);
      },
      width: '10%',
    },
    {
      title: 'Eligible',
      render: ({eligibleEmployees}) => {
        return (
          <div style={{textAlign: 'right', paddingRight: 24}}>
            {eligibleEmployees}
          </div>
        );
      },
      width: '10%',
    },
    {
      title: 'Payout',
      render: ({eligibleEmployees, rate}) => {
        return (
          <div style={{textAlign: 'right', paddingRight: 24}}>
            {helpers.centsToDollars(eligibleEmployees * rate)}
          </div>
        );
      },
      width: '10%',
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
