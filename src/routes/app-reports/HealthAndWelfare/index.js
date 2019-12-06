import React from 'react';
import numeral from 'numeral';
import styled from 'styled-components';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
import TopContainer from 'components/common/TopContainer';
import {Doughnut} from 'react-chartjs-2';

const PieChartPlaceholder = styled.div`
  width: 500px;
  height: 400px;
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
        <ValueItemValue>{value}</ValueItemValue>
      </Col>
    </Row>
  </ValueItemContainer>
);

const CHART_COLORS = ['#8CB3CD', '#0F3557', '#145D92', '#5A89AB'];

const MobileWrapper = styled.div`
  @media only screen and (max-width: 414px) {
    margin-top: 24px;
  }
`;

const Caption = styled.p`
  @media only screen and (max-width: 414px) {
    margin-bottom: 32px;
  }
`;
// month: "String"
// totalHealthAndWelfare: "String"
// totalVHS: "String"
// year: "String"

// labelForTotalFringe
// labelForTotalHours
// labelForVHS
// labelForAdminCosts
// labelForTotalRetirement
class HealthAndWelfare extends React.PureComponent {
  render() {
    const {report} = this.props;
    let labelForVHS = report.labelForVHS
      ? report.labelForVHS
      : 'TOTAL VACATION, HOLIDAY, SICK';
    return (
      <div>
        <TopContainer>
          <Row style={{width: '100%'}}>
            {' '}
            <Col xs={24} md={9} lg={7}>
              <BigValue>{numeral(report.totalHours).format('0,0.0')}</BigValue>
              <BigLabel>{report.labelForTotalHours || 'Total Hours'}</BigLabel>
            </Col>
            <Col xs={24} md={8} lg={8}>
              <MobileWrapper>
                <BigValue>
                  ${numeral(report.totalFringe).format('0,0.00')}
                </BigValue>
                <BigLabel>
                  {report.labelForTotalFringe || 'TOTAL FRINGE*'}
                </BigLabel>
              </MobileWrapper>
            </Col>
            <Col xs={24} md={7} lg={9} />
          </Row>
        </TopContainer>{' '}
        <Caption style={{textAlign: 'right'}}>
          {report.captionForHealthAndWelfare ||
            '*Including H&W, VHS & Administrative Costs'}
        </Caption>
        <Row align="top">
          {' '}
          <Col xs={24} md={12}>
            <ValueItem
              label="Total Health & Welfare"
              value={`$${numeral(report.totalHealthAndWelfare).format(
                '0,0.00'
              )}`}
              color={CHART_COLORS[0]}
            />
            <ValueItem
              label={labelForVHS}
              value={`$${numeral(report.totalVHS).format('0,0.00')}`}
              color={CHART_COLORS[1]}
            />
          </Col>
          <Col xs={24} md={12}>
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
                  labels: ['Total Health & Welfare', labelForVHS],
                  datasets: [
                    {
                      data: [report.totalHealthAndWelfare, report.totalVHS],
                      backgroundColor: [CHART_COLORS[0], CHART_COLORS[1]],
                    },
                  ],
                }}
              />
            </PieChartPlaceholder>
          </Col>
        </Row>
      </div>
    );
  }
}
/* data={[
                  {
                    id: 'Total Health & Welfare',
                    label: 'Total Health & Welfare',
                    value: report.totalHealthAndWelfare,
                    color: CHART_COLORS[0],
                  },
                  {
                    id: labelForVHS,
                    label: labelForVHS,
                    value: report.totalVHS,
                    color: CHART_COLORS[1],
                  },
                ]} */
export default HealthAndWelfare;
