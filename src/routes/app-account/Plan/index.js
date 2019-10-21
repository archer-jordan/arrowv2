import React from 'react';
import styled from 'styled-components';

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
    <div style={{flex: 1}}>
      <PlanTitle>{name}</PlanTitle>
    </div>
    <div style={{flex: 1}}>
      <CsvLink>download csv</CsvLink>
    </div>
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
