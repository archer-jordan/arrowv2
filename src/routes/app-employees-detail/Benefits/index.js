import React from 'react';
import styled from 'styled-components';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
// lib
import checkSVG from 'lib/media/check-circle.svg';

const BenefitType = styled(BigLabel)`
  font-weight: 500;
  font-size: 28px;
  color: #0f466a;
`;

const RequiredHours = styled(BigLabel)`
  font-weight: 300;
  font-size: 40px;
  line-height: 40px;
  margin-top: 0px;
`;

const BenefitRow = () => (
  <Row
    gutter={16}
    style={{height: 80, marginTop: 24, borderBottom: '1px solid #efefef'}}
  >
    <Col xs={12}>
      <BenefitType>TELEDOC</BenefitType>
    </Col>
    <Col xs={6}>
      <RequiredHours>40</RequiredHours>
    </Col>

    <Col xs={6}>
      <BigLabel>
        <img src={checkSVG} alt="check-circle" height="56" weight="56" />
      </BigLabel>
    </Col>
  </Row>
);

const MOCK_DATA = [
  {
    requiredHours: 40,
    type: 'type',
  },
  {
    requiredHours: 40,
    type: 'type',
  },
  {
    requiredHours: 40,
    type: 'type',
  },
];

const ColumnTitle = styled.div`
  font-weight: 500;
  line-height: 16px;
  color: #0f466a;
`;
// tri
class Benefits extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <TopContainer style={{justifyContent: 'flex-end'}}>
            <div>
              {' '}
              <BigValue style={{textAlign: 'right'}}>Anthony Comito</BigValue>
              <BigLabel style={{textAlign: 'right', textTransform: 'none'}}>
                christianlonglastname@yahoo.com
              </BigLabel>
            </div>
          </TopContainer>
        </div>{' '}
        <Row gutter={16} style={{marginTop: 16, marginBottom: 24}}>
          <Col xs={4}>
            <ColumnTitle style={{marginLeft: 8}}>
              {this.props.month.toUpperCase()} <br />
              HOURS
            </ColumnTitle>
          </Col>
          <Col xs={10}>
            <ColumnTitle>
              {' '}
              BENEFIT
              <br /> TYPE{' '}
            </ColumnTitle>
          </Col>
          <Col xs={5}>
            <ColumnTitle>
              {' '}
              REQUIRED <br />
              HOURS{' '}
            </ColumnTitle>
          </Col>

          <Col xs={5}>
            <ColumnTitle>
              FEBRUARY <br />
              ELIGIBILITY{' '}
            </ColumnTitle>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: 16}}>
          <Col xs={4}>
            <TopContainer>
              <BigValue style={{textAlign: 'center'}}>41</BigValue>
            </TopContainer>
          </Col>
          <Col xs={20}>
            {MOCK_DATA.map(item => (
              <BenefitRow />
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Benefits;
