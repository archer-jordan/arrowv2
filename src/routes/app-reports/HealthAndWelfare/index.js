import React from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-styled-flexboxgrid';

const TopContainer = styled.div`
  height: 125px;
  width: 100%;
  background: #e5eff5;
  max-width: 100%;
  border-radius: 15px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 414px) {
    height: 245px;
  }
`;

const BigValue = styled.div`
  font-size: 48px;
  color: #0f466a;
`;

const BigLabel = styled.div`
  font-size: 12px;
  color: #1371a3;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 8px;
`;

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

const ValueItemLabel = styled(BigLabel)``;

const ValueItemValue = styled(BigValue)`
  font-size: 28px;
  letter-spacing: 1.5px;
`;

const ValueItem = ({label, value, color}) => (
  <ValueItemContainer>
    {' '}
    <Row style={{display: 'flex', alignItems: 'center'}}>
      <Col xs={2}>
        {' '}
        <div
          style={{
            height: 25,
            width: 25,
            borderRadius: '50%',
            background: color,
            marginTop: 32,
          }}
        />
      </Col>
      <Col xs={10}>
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
            <Col sm={12} md={4}>
              <BigValue>18,577</BigValue>
              <BigLabel>Total Hours</BigLabel>
            </Col>
            <Col sm={12} md={4}>
              <BigValue>$108,589.71</BigValue>
              <BigLabel>TOTAL FRINGE*</BigLabel>
            </Col>
            <Col sm={12} md={4} />
          </Row>
        </TopContainer>
        <Row>
          {' '}
          <Col xs={12} md={8}>
            {MOCK_DATA.map((item, i) => (
              <ValueItem key={item.label} {...item} color={CHART_COLORS[i]} />
            ))}
          </Col>
          <Col xs={12} md={4}>
            <PieChartPlaceholder />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HealthAndWelfare;
