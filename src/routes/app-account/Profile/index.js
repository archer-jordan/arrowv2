import React from 'react';
import styled from 'styled-components';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';

const ColumnHeadline = styled(BigValue)`
  font-size: 24px;
  height: 32px;
  line-height: 32px;
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;

const MobileHeadline = styled(BigValue)`
  font-size: 24px;
  height: 32px;
  line-height: 32px;
  display: none;
  margin-bottom: 16px;
  margin-top: 16px;
  @media only screen and (max-width: 414px) {
    display: inherit;
  }
`;

const MobileTopContainer = styled(TopContainer)`
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;

const Label = styled(BigValue)`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  height: 16px;
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

const RowContainer = styled(Row)`
  width: 100%;
  padding: 24px;
  min-height: 500px;
  @media only screen and (max-width: 414px) {
    padding: 0px;
  }
`;

class Profile extends React.PureComponent {
  render() {
    return (
      <div>
        <MobileTopContainer>
          <Row style={{width: '100%'}}>
            <Col xs={24} sm={12}>
              <ColumnHeadline>Contact information</ColumnHeadline>
            </Col>
            <Col xs={24} sm={12}>
              <ColumnHeadline>Company information</ColumnHeadline>
            </Col>
          </Row>
        </MobileTopContainer>
        <RowContainer>
          <Col xs={24} sm={10}>
            <MobileHeadline>Contact information</MobileHeadline>
            <DataItem label="First Name" value="John" />
            <DataItem label="Last Name" value="Johnson" />
            <DataItem label="Role or Title" value="President" />{' '}
            <DataItem label="Email" value="john@company.com" />
            <DataItem label="Phone" value="555.555.5555" />
          </Col>{' '}
          <Col
            xs={0}
            sm={2}
            style={{display: 'flex', justifyContent: 'center'}}
          >
            <div style={{width: 2, height: 200, background: '#efefef'}} />
          </Col>
          <Col xs={24} sm={10}>
            <MobileHeadline>Company information</MobileHeadline>
            <DataItem label="Name" value="Narcors Inc" />
            <DataItem label="Address" value="123 Market St" />
            <DataItem label="City" value="Portsmouth" />
            <DataItem label="State" value="NH" />
            <DataItem label="Zip" value="03801" />
            <DataItem label="Company Type" value="LLC" />
            <DataItem label="EIN #" value="12-555555" />
          </Col>
        </RowContainer>
      </div>
    );
  }
}

export default Profile;
