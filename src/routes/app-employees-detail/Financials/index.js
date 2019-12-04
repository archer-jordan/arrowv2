import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
import PieChart from 'components/common/PieChart';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
// APOLLO
import employeeReportByEmployeeId from 'ApolloClient/Queries/employeeReportByEmployeeId';
import {Query} from 'react-apollo';

const PieChartPlaceholder = styled.div`
  width: 250px;
  height: 250px;
`;

// [
//   '#8CB3CD',
//   '#145D92',
//   '#5A89AB',
//   '#0F3557',
//   '#0B4F71',
//   '#166086',
//   '#3994C1',
// ]

const MOCK_DATA = [
  {
    id: '1',
    color: '#8CB3CD',
    title: 'FRINGE DOLLARS',
    amount: 19642,
  },
  {
    id: '2',
    color: '#145D92',
    title: 'HEALTH & WELFARE',
    amount: 12527,
  },
  {
    id: '3',
    color: '#5A89AB',
    title: 'RETIREMENT',
    amount: 5740,
  },
];

const ColorCircle = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: ${p => (p.color ? p.color : 'red')};
`;

const FinancialRow = ({label, value, color}) => {
  return (
    <div
      style={{
        height: 100,
        marginBottom: 24,
        borderBottom: '1px solid #efefef',
        position: 'relative',
        width: 350,
        maxWidth: '100%',
      }}
    >
      <div style={{display: 'inline-block', minWidth: 150}}>
        <BigLabel>{label}</BigLabel>
        <BigValue style={{fontSize: 40}}>${value}</BigValue>
      </div>
      <div style={{display: 'inline-block', marginLeft: 16}}>
        <ColorCircle color={color} />
      </div>
    </div>
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
                {
                  id: '1',
                  label: 'Fringe Dollars',
                  value: report.fringeDollars,
                  color: '#8CB3CD',
                },
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
                  <Col xs={16}>
                    {' '}
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
                  <Col xs={8}>
                    <PieChartPlaceholder>
                      <PieChart data={dataArray} />
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
