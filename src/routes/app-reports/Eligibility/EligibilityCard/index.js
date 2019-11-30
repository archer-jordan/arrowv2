import React from 'react';
import styled from 'styled-components';
import PieChart from 'components/common/PieChart';

const PieChartPlaceholder = styled.div`
  margin: auto;
  width: 150px;
  height: 150px;
  /* max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  background: #1371a3;
  margin-top: 8px; */
`;

const Container = styled.div`
  margin-top: 64px;
  text-align: center;
  border-right: 3px solid
    ${p => (p.noBorder ? 'inherit' : p.theme.colors.neutral10)};
`;

const Value = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #0f466a;
  height: 32px;
  line-height: 32px;
  margin-top: 8px;
`;

const Title = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 400;
  height: 40px;
  letter-spacing: 1px;
  color: #1371a3;
`;

const Type = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 1px;
  color: #0f466a;
  margin-top: 0px;
`;

class EligibilityCard extends React.PureComponent {
  render() {
    return (
      <Container noBorder={this.props.noBorder}>
        {' '}
        <Title>{this.props.card.label}</Title>
        <PieChartPlaceholder>
          <PieChart
            data={[
              {
                id: '1',
                label: 'Eligible',
                value: this.props.card.value,
              },
              {
                id: '2',
                label: 'Ineligble',
                value: this.props.card.comparison,
              },
            ]}
          />
        </PieChartPlaceholder>{' '}
        <Value>{this.props.card.value}</Value>
        <Type>{this.props.card.type}</Type>
      </Container>
    );
  }
}

export default EligibilityCard;
