import React from 'react';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import styled from 'styled-components';

const Label = styled.span`
  color: ${p => p.theme.colors.neutral7};
  text-transform: uppercase;
`;

const PageBreak = styled.div`
  border: 2px solid ${p => p.theme.colors.neutral7};
  margin-top: 16px;
`;

const ReportRow = ({item, active, onClick}) => {
  const {
    month,
    year,
    totalFringe,
    totalHours,
    activeThisMonth,
    labelForTotalHours,
    labelForTotalFringe,
    labelForVHS,
    totalVHS,
    benefits,
    labelForTotalRetirement,
    totalRetirement,
    totalEmployees,
    totalHealthAndWelfare,
    labelForAdminCosts,
    captionForHealthAndWelfare,
    totalFringeBenefitsSpend,
    totalFringeBenefitsSpendLabel,
  } = item;

  return (
    <Row
      onClick={onClick}
      style={{cursor: 'pointer', borderTop: '1px solid #efefef'}}
    >
      <Col xs={3}>
        {month}/{year}
      </Col>
      <Col xs={1}></Col>
      <Col xs={20}>
        {active && (
          <div>
            {/* <div>
              <Label>id</Label>: {id}
            </div>
            <div>
              <Label>customerId</Label>: {customerId}
            </div> */}
            <div>
              <Label>month</Label>: {month}
            </div>
            <div>
              <Label>year</Label>: {year}
            </div>
            <div>
              <Label>{labelForTotalHours || 'Total Hours'}</Label>: {totalHours}
            </div>
            <div>
              <Label>{labelForTotalFringe || 'Total Fringe'}</Label>:{' '}
              {totalFringe}
            </div>
            <div>
              <Label>{'Total Health & Welfare'}</Label>:{' '}
              {totalHealthAndWelfare || 'N/A'}
            </div>{' '}
            <div>
              <Label>{labelForVHS || 'TOTAL VHS'}</Label>: {totalVHS}
            </div>
            <div>
              <Label>{'Label for Admin Costs'}</Label>:{' '}
              {labelForAdminCosts || 'N/A'}
            </div>
            <div>
              <Label>Total Employees</Label>: {totalEmployees}
            </div>
            <div>
              <Label>Active this month</Label>: {activeThisMonth}
            </div>
            <div>
              <Label>
                {totalFringeBenefitsSpendLabel || 'Total Fringe benefits Spend'}
              </Label>
              : {totalFringeBenefitsSpend}
            </div>
            <div>
              <Label>{labelForTotalRetirement || 'Total Retirement'}</Label>:{' '}
              {totalRetirement || 'N/A'}
            </div>
            <PageBreak />
            <div>
              <Label>Caption for Health & Welfare</Label>:{' '}
              {captionForHealthAndWelfare}
            </div>
            <PageBreak />
            <Label> BENEFITS:</Label>{' '}
            <div style={{paddingLeft: 16}}>
              {benefits &&
                benefits.map(item => (
                  <div key={item.label}>
                    {item.label} | {item.value} | {item.employees}
                  </div>
                ))}
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ReportRow;
