import React from 'react';
import styled from 'styled-components';
import {Doughnut} from 'react-chartjs-2';

const PieChartPlaceholder = styled.div`
  margin: auto;
  width: 250px;
  height: 150px;
  position: relative;
  left: -20px;
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
/// ['#8CB3CD', '#0F3557', '#145D92', '#5A89AB']
const CHART_COLORS = ['#0F3557', '#e5eff5'];

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
          <Doughnut
            options={{
              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false,
              },
            }}
            data={{
              labels: ['Eligible', 'Ineligble'],
              datasets: [
                {
                  data: [this.props.card.value, this.props.card.comparison],
                  backgroundColor: [CHART_COLORS[0], CHART_COLORS[1]],
                },
              ],
            }}
          />
        </PieChartPlaceholder>{' '}
        <Value>{this.props.card.value}</Value>
        <Type>{this.props.card.type}</Type>
      </Container>
    );
  }
}

export default EligibilityCard;
