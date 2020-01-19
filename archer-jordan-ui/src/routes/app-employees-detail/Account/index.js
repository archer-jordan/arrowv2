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
    return (
      <div>
        <TopContainer style={{justifyContent: 'flex-end'}}>
          <div>
            {' '}
            <BigValue style={{textAlign: 'right'}}>
              {' '}
              {this.props.employee.firstName} {this.props.employee.lastName}
            </BigValue>
            <BigLabel style={{textAlign: 'right'}}>
              {this.props.employee.email}
            </BigLabel>
          </div>
        </TopContainer>
        <div style={{width: 350, maxWidth: '100%', marginTop: 24}}>
          <DataItem label="Last Name" value={this.props.employee.lastName} />
          <DataItem label="First Name" value={this.props.employee.firstName} />
          <DataItem label="Gender" value={this.props.employee.gender} />
          <DataItem
            label="DOB"
            value={moment(parseInt(this.props.employee.dob)).format('M/D/YYYY')}
          />
          <DataItem label="Street" value={this.props.employee.street} />
          <DataItem label="City" value={this.props.employee.city} />
          <DataItem label="State" value={this.props.employee.state} />
          <DataItem label="Zip" value={this.props.employee.zip} />
          <DataItem
            label="Hire Date"
            value={moment(parseInt(this.props.employee.hireDate)).format(
              'M/D/YYYY'
            )}
          />
        </div>
      </div>
    );
  }
}

export default Account;
