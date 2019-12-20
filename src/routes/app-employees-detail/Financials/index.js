import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
import {Doughnut} from 'react-chartjs-2';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
// APOLLO
import employeeReportByEmployeeId from 'ApolloClient/Queries/employeeReportByEmployeeId';
import {Query} from 'react-apollo';

const PieChartPlaceholder = styled.div`
  width: 550px;
  height: 350px;
`;

const ColorCircle = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: ${p => (p.color ? p.color : 'red')};
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
        <BigValue style={{fontSize: 40}}>${value}</BigValue>
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
              if (loading) return 'loading';
              if (error) return 'error';
              if (
                !data.employeeReportByEmployeeId ||
                !data.employeeReportByEmployeeId.benefits
              ) {
                return 'No data';
              }
              let report = data.employeeReportByEmployeeId;
              let dataArray = [
                //{
                //  id: '1',
                //  label: 'Fringe Dollars',
                //  value: report.fringeDollars,
                //  color: '#8CB3CD',
                //},
                {
                  id: '2',
                  label: 'Health & Welfare',
                  value: report.healthAndWelfare,
                  color: '#145D92',
                },
                {
                  id: '3',
                  label: 'Retirement',
                  value: report.retirement,
                  color: '#5A89AB',
                },
              ];
              return (
                <Row gutter={16} style={{marginTop: 30}}>
                  <Col xs={24} md={10}>
                    {' '}
                    <FinancialRow
                      label={'Fringe Dollars'}
                      value={report.fringeDollars}
                      color={null}
                    />
                    {dataArray.map(item => {
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
                          labels: dataArray.map(item => item.label), //['Eligible', 'Ineligble'],
                          datasets: [
                            {
                              data: dataArray.map(item => item.value),
                              backgroundColor: dataArray.map(
                                item => item.color
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
