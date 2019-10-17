import React from 'react';
import styled from 'styled-components';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
import TopContainer from 'components/common/TopContainer';

const MOCK_DATA = [
  {value: 9940220, label: 'TOTAL HEALTH & WELFARE'},
  {value: 918718, label: 'TOTAL VACATION HOLIDAY & SICK'},
];

const PieChartPlaceholder = styled.div`
  width: 200px;
  height: 180px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  background: #1371a3;
  margin-top: 16px;
`;

const ValueItemContainer = styled.div`
  border-bottom: 1px solid #efefef;
  padding: 8px;
  width: 290px;
  margin-bottom: 8px;
`;

const ValueItemLabel = styled(BigLabel)`
  margin-bottom: 0px;
`;

const ValueItemValue = styled(BigValue)`
  font-size: 28px;
  letter-spacing: 1.5px;
`;

const ValueItem = ({label, value, color}) => (
  <ValueItemContainer>
    {' '}
    <Row style={{display: 'flex', alignItems: 'center'}}>
      <Col xs={3}>
        {' '}
        <div
          style={{
            height: 25,
            width: 25,
            borderRadius: '50%',
            background: color,
            marginTop: 20,
          }}
        />
      </Col>
      <Col xs={21}>
        {' '}
        <ValueItemLabel>{label}</ValueItemLabel>
        <ValueItemValue>
          {(value / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </ValueItemValue>
      </Col>
    </Row>
  </ValueItemContainer>
);

const CHART_COLORS = ['#8CB3CD', '#0F3557', '#145D92', '#5A89AB'];

class HealthAndWelfare extends React.PureComponent {
  render() {
    return (
      <div>
        <TopContainer>
          <Row style={{width: '100%'}}>
            {' '}
            <Col xs={24} md={9} lg={7}>
              <BigValue>18,577</BigValue>
              <BigLabel>Total Hours</BigLabel>
            </Col>
            <Col xs={24} md={8} lg={8}>
              <BigValue>$108,589.71</BigValue>
              <BigLabel>TOTAL FRINGE*</BigLabel>
            </Col>
            <Col xs={24} md={7} lg={9} />
          </Row>
        </TopContainer>{' '}
        <p style={{textAlign: 'right'}}>
          *Including H&W, VHS & Administrative Costs
        </p>
        <Row>
          {' '}
          <Col xs={24} md={16}>
            {MOCK_DATA.map((item, i) => (
              <ValueItem key={item.label} {...item} color={CHART_COLORS[i]} />
            ))}
          </Col>
          <Col xs={24} md={8}>
            <PieChartPlaceholder />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HealthAndWelfare;
