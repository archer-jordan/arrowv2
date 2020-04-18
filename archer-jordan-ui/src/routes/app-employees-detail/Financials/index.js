import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import numeral from 'numeral';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Loading from 'components/common/Loading';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
import {Doughnut} from 'react-chartjs-2';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
import theme from 'lib/theme';
// APOLLO
import employeeReportByEmployeeId from 'ApolloClient/Queries/employeeReportByEmployeeId';
import {Query} from 'react-apollo';

const PieChartPlaceholder = styled.div`
  width: 550px;
  height: 350px;
  max-width: 100%;
`;

const ColorCircle = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: ${(p) => (p.color ? p.color : 'red')};
`;

const FinancialRowContainer = styled.div`
  height: 100px;
  margin-bottom: 24px;
  border-bottom: 1px solid #efefef;
  position: relative;
  width: 350px;
  max-width: 100%;
`;

const FinancialRow = ({label, value, color}) => {
  return (
    <FinancialRowContainer>
      <div style={{display: 'inline-block', minWidth: 150}}>
        <BigLabel>{label}</BigLabel>
        <BigValue style={{fontSize: 40}}>
          ${numeral(value).format('0,0.00')}
        </BigValue>
      </div>
      <div style={{display: 'inline-block', marginLeft: 16}}>
        {color && <ColorCircle color={color} />}
      </div>
    </FinancialRowContainer>
  );
};

class Financials extends React.PureComponent {
  render() {
    return (
      <div style={{paddingBottom: 90}}>
        <div>
          <TopContainer style={{justifyContent: 'flex-end'}}>
            <div>
              {' '}
              <BigValue style={{textAlign: 'right'}}>
                {' '}
                {this.props.employee.firstName} {this.props.employee.lastName}
              </BigValue>
              <BigLabel style={{textAlign: 'right'}}>
                {this.props.employee.email}
              </BigLabel>
            </div>
          </TopContainer>
          <Query
            query={employeeReportByEmployeeId}
            variables={{
              month: moment(
                helpers.capitalize(this.props.month),
                'MMMM'
              ).format('M'),
              year: this.props.year,
              employeeId: this.props.employeeId,
            }}
          >
            {({loading, data, error}) => {
              // if loading, show loading
              if (loading) return <Loading />;
              // if an error, show error
              if (error) return 'error';

              // if no data, tell the user no data
              if (
                !data.employeeReportByEmployeeId ||
                !data.employeeReportByEmployeeId.benefits
              ) {
                return 'No data';
              }
              // if the report
              let report = data.employeeReportByEmployeeId;

              // create an array that we'll use for the legend and the pie chart
              let dataArray = [
                {
                  id: '2',
                  label: report.healthAndWelfareLabel || 'Health & Welfare',
                  value: report.healthAndWelfare,
                  color: theme.colors.primary1,
                },
                {
                  id: '3',
                  label: report.retirementLabel || 'Retirement',
                  value: report.retirement,
                  color: '#5A89AB',
                },
              ];

              return (
                <Row gutter={16} style={{marginTop: 30}}>
                  <Col xs={24} md={10}>
                    {' '}
                    <FinancialRow
                      label={report.fringeDollarsLabel || 'Fringe Dollars'}
                      value={report.fringeDollars}
                      color={null}
                    />
                    {dataArray.map((item) => {
                      return (
                        <FinancialRow
                          key={item.id}
                          label={item.label}
                          value={item.value}
                          color={item.color}
                        />
                      );
                    })}
                  </Col>
                  <Col xs={24} md={14}>
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
                          labels: dataArray.map((item) => item.label), //['Eligible', 'Ineligble'],
                          datasets: [
                            {
                              data: dataArray.map((item) => item.value),
                              backgroundColor: dataArray.map(
                                (item) => item.color
                              ),
                            },
                          ],
                        }}
                      />
                    </PieChartPlaceholder>
                  </Col>
                </Row>
              );
            }}
          </Query>
        </div>{' '}
      </div>
    );
  }
}

export default Financials;
