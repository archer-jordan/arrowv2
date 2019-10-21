import React from 'react';
import styled from 'styled-components';
import Row from 'components/common/Row';
import Col from 'components/common/Col';

const HeaderBlock = styled.div`
  background: #e5eff5;
  height: 32px;
  width: 100%;
  border-radius: 25px;
  color: #1371a3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 16px;
  font-size: 16px;
  margin-bottom: 32px;
`;

const BlockContainer = styled.div`
  border-bottom: 2px solid ${p => p.theme.colors.neutral10};
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media only screen and (max-width: 414px) {
    height: 65px;
  }
`;

const PlanTitle = styled.div`
  text-transform: uppercase;
  color: ${p => p.theme.colors.primary1};
  font-weight: 600;
  font-family: ${p => p.theme.fontFamily};
`;

const CsvLink = styled.a`
  color: #f2495c;
`;

const PlanBlock = ({name = 'NAME', link = 'LINK'}) => (
  <BlockContainer>
    <Row style={{width: '100%'}}>
      <Col xs={24} md={12}>
        <PlanTitle>{name}</PlanTitle>
      </Col>
      <Col xs={24} md={12}>
        <CsvLink>download csv</CsvLink>
      </Col>
    </Row>
  </BlockContainer>
);

class Plan extends React.PureComponent {
  render() {
    return (
      <div>
        <HeaderBlock>Current Beneﬁts Plan</HeaderBlock>
        <div>
          <PlanBlock name="PLAN LOGIC + BENEFITS ELIGIBILITY" />
          <PlanBlock name="FRINGE INFORMATION" />
          <PlanBlock name="VHS INFORMATION" />
        </div>
      </div>
    );
  }
}

export default Plan;
