// TOP LEVEL IMPORTS
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
import TopContainer from 'components/common/TopContainer';

const Label = styled(BigValue)`
  font-size: 18px !important;
  font-weight: 700;
  line-height: 16px;
  min-height: 16px;
  margin-bottom: 16px;
`;

const Value = styled(Label)`
  font-weight: 400;
`;

const DataItem = ({label = 'First Name', value = 'John'}) => (
  <Row>
    <Col xs={12}>
      <Label>{label}</Label>
    </Col>
    <Col xs={12}>
      <Value>{value}</Value>
    </Col>
  </Row>
);

class Account extends React.PureComponent {
  render() {
    const {employee} = this.props;
    // check if employee exists
    if (!employee) return 'No data';
    // return JSX
    return (
      <div>
        <TopContainer style={{justifyContent: 'flex-end'}}>
          <div>
            {' '}
            <BigValue style={{textAlign: 'right'}}>
              {' '}
              {employee.firstName} {employee.lastName}
            </BigValue>
            <BigLabel style={{textAlign: 'right'}}>{employee.email}</BigLabel>
          </div>
        </TopContainer>
        <div style={{width: 350, maxWidth: '100%', marginTop: 24}}>
          <DataItem label="Last Name" value={employee.lastName} />
          <DataItem label="First Name" value={employee.firstName} />
          <DataItem
            label="Gender"
            value={employee && employee.gender && employee.gender.toUpperCase()}
          />
          <DataItem
            label="DOB"
            value={moment(parseInt(employee.dob)).format('M/D/YYYY')}
          />
          <DataItem label="Street" value={employee.street} />
          <DataItem label="City" value={employee.city} />
          <DataItem label="State" value={employee.state} />
          <DataItem label="Zip" value={employee.zip} />
          <DataItem
            label="Hire Date"
            value={moment(parseInt(employee.hireDate)).format('M/D/YYYY')}
          />
        </div>
      </div>
    );
  }
}

export default Account;
