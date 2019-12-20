import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
import checkSVG from 'lib/media/check-circle.svg';
// APOLLO
import employeeReportByEmployeeId from 'ApolloClient/Queries/employeeReportByEmployeeId';
import {Query} from 'react-apollo';

const BenefitType = styled(BigLabel)`
  font-weight: 500;
  font-size: 24px;
  color: #0f466a;
`;

const RequiredHours = styled(BigLabel)`
  font-weight: 300;
  font-size: 32px;
  line-height: 32px;
  margin-top: 0px;
`;

const BenefitRow = ({label, hours, eligibility}) => (
  <Row
    gutter={16}
    style={{height: 72, paddingTop: 16, borderBottom: '1px solid #efefef'}}
  >
    <Col xs={12}>
      <BenefitType>{label}</BenefitType>
    </Col>
    <Col xs={6}>
      <RequiredHours>{hours}</RequiredHours>
    </Col>

    <Col xs={6}>
      {eligibility ? (
        <BigLabel>
          <img src={checkSVG} alt="check-circle" height="56" weight="56" />
        </BigLabel>
      ) : null}
    </Col>
  </Row>
);

const ColumnTitle = styled.div`
  font-weight: 500;
  line-height: 16px;
  color: #0f466a;
`;
// tri
class Benefits extends React.PureComponent {
  render() {
    return (
      <Query
        query={employeeReportByEmployeeId}
        variables={{
          month: moment(helpers.capitalize(this.props.month), 'MMMM').format(
            'M'
          ),
          year: this.props.year,
          employeeId: this.props.employeeId,
        }}
      >
        {({loading, data, error}) => {
          if (loading) return 'loading';
          if (error) return 'error';
          console.log(data);
          if (
            !data.employeeReportByEmployeeId ||
            !data.employeeReportByEmployeeId.benefits
          ) {
            return 'No data';
          }

          let report = data.employeeReportByEmployeeId;

          console.log({
            data,
          });
          return (
            <div>
              <div>
                <TopContainer style={{justifyContent: 'flex-end'}}>
                  <div>
                    {' '}
                    <BigValue style={{textAlign: 'right'}}>
                      {this.props.employee.firstName}{' '}
                      {this.props.employee.lastName}
                    </BigValue>
                    <BigLabel style={{textAlign: 'right'}}>
                      {this.props.employee.email}
                    </BigLabel>
                  </div>
                </TopContainer>
              </div>{' '}
              <Row gutter={16} style={{marginTop: 16, marginBottom: 24}}>
                <Col xs={4}>
                  <ColumnTitle style={{marginLeft: 8}}>
                    {this.props.month.toUpperCase()} <br />
                    HOURS
                  </ColumnTitle>
                </Col>
                <Col xs={10}>
                  <ColumnTitle>
                    {' '}
                    BENEFIT
                    <br /> TYPE{' '}
                  </ColumnTitle>
                </Col>
                <Col xs={5}>
                  <ColumnTitle>
                    {' '}
                    REQUIRED <br />
                    HOURS{' '}
                  </ColumnTitle>
                </Col>

                <Col xs={5}>
                  <ColumnTitle>
                    {moment(helpers.capitalize(this.props.month), 'MMMM')
                      .add(1, 'months')
                      .format('MMMM')
                      .toUpperCase()}
                    <br />
                    ELIGIBILITY{' '}
                  </ColumnTitle>
                </Col>
              </Row>
              <Row gutter={16} style={{marginTop: 16}}>
                <Col xs={4}>
                  <TopContainer>
                    <BigValue style={{textAlign: 'center'}}>
                      {report.hours}
                    </BigValue>
                  </TopContainer>
                </Col>
                <Col xs={20}>
                  {report.benefits.map(item => (
                    <BenefitRow key={item.label} {...item} />
                  ))}
                </Col>
              </Row>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Benefits;
