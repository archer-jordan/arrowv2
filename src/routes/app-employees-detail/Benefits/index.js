import React from 'react';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
// lib
import checkSVG from 'lib/media/check-circle.svg';

const BenefitRow = () => (
  <Row
    gutter={16}
    style={{height: 100, marginTop: 24, borderBottom: '1px solid #efefef'}}
  >
    <Col xs={6}>
      <BigLabel>40</BigLabel>
    </Col>
    <Col xs={12}>
      <BigLabel>TELEDOC</BigLabel>
    </Col>
    <Col xs={6}>
      <BigLabel>
        <img src={checkSVG} alt="check-circle" height="32" weight="32" />
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
          <Col xs={4}>
            JANUARY <br />
            HOURS
          </Col>
          <Col xs={5}>
            REQUIRED <br />
            HOURS
          </Col>
          <Col xs={10}>
            BENEFIT
            <br /> TYPE
          </Col>
          <Col xs={5}>
            FEBRUARY <br />
            ELIGIBILITY
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
