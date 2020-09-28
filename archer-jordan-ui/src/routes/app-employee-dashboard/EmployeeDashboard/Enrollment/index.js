import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
// LIB
import constants from 'lib/constants';

const PlanName = styled.h1`
  margin: 0px;
  font-weight: 700;
`;

const Text = styled.p`
  margin: 0px;
  margin-top: 8px;
`;

const ReadOnlyEnrollment = ({customer, employee}) => {
  const {planType, enrollmentWindowStart, enrollmentWindowEnd} = customer;
  return (
    <div>
      <PlanName>
        {constants.plans.filter((item) => item.id === planType)[0].title}
      </PlanName>
      {planType === 'arrowCarePlus' && (
        <>
          <Text>Enrollment Window (14 Days)</Text>
          <Text>
            <strong>
              {moment(parseInt(enrollmentWindowStart)).format('MM/DD/YYYY ')}
            </strong>{' '}
            {'   '}
            to
            {'   '}
            <strong>
              {moment(parseInt(enrollmentWindowEnd)).format('MM/DD/YYYY ')}
            </strong>
          </Text>
          {/* <Text>Include spouse: You have selected "YES"</Text>
          <Text>Number of dependents you have opted to include: 0</Text> */}
        </>
      )}
    </div>
  );
};

const EditEnrollment = ({customer}) => {
  const {planType, enrollmentWindowStart, enrollmentWindowEnd} = customer;
  return (
    <>
      <PlanName>
        {constants.plans.filter((item) => item.id === planType)[0].title}
      </PlanName>
      {planType === 'arrowCarePlus' && (
        <>
          <Text>Enrollment Window (14 Days)</Text>
          <Text>
            <strong>
              {moment(parseInt(enrollmentWindowStart)).format('MM/DD/YYYY ')}
            </strong>{' '}
            {'   '}
            to
            {'   '}
            <strong>
              {moment(parseInt(enrollmentWindowEnd)).format('MM/DD/YYYY ')}
            </strong>
          </Text>
          {/* <Text>Include spouse: You have selected "YES"</Text>
          <Text>Number of dependents you have opted to include: 0</Text> */}
        </>
      )}
    </>
  );
};

export default ({employee}) => {
  //
  const {customer} = employee;
  const {enrollmentWindowStart, enrollmentWindowEnd} = customer;

  let today = moment().startOf('day').valueOf();
  let enrollmentOpen =
    moment(parseInt(enrollmentWindowStart)).startOf('day').valueOf() < today && // if start date is less than today
    moment(parseInt(enrollmentWindowEnd)).startOf('day').valueOf() > today; // if end date is greater than today

  if (!enrollmentOpen) {
    return <ReadOnlyEnrollment customer={customer} employee={employee} />;
  }

  return <EditEnrollment customer={customer} employee={employee} />;
};
