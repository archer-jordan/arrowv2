import React from 'react';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';

const BenefitRow = () => (
  <Row
    gutter={16}
    style={{height: 100, marginTop: 24, borderBottom: '1px solid #efefef'}}
  >
    <Col xs={6}>
      <BigLabel>BigLabel</BigLabel>
    </Col>
    <Col xs={12}>
      <BigLabel>BigLabel</BigLabel>
    </Col>
    <Col xs={6}>
      <BigLabel>BigLabel</BigLabel>
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

class Benefits extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <TopContainer style={{justifyContent: 'flex-end'}}>
            <div>
              {' '}
              <BigValue style={{textAlign: 'right'}}>Anthony Comito</BigValue>
              <BigLabel style={{textAlign: 'right'}}>
                christianlonglastname@yahoo.com
              </BigLabel>
            </div>
          </TopContainer>
        </div>{' '}
        <Row gutter={16} style={{marginTop: 16}}>
          <Col xs={4}>JANUARY HOURS</Col>
          <Col xs={5}>REQUIRED HOURS</Col>
          <Col xs={10}>BENEFIT TYPE</Col>
          <Col xs={5}>FEBRUARY ELIGIBILITY</Col>
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
