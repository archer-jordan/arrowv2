import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Loading from 'components/common/Loading';
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
  font-size: 18px;
  color: #0f466a;
  @media only screen and (max-width: 1200px) {
    font-size: 16px;
  }
`;

const HoursContainer = styled.div`
  width: 100%;
  background: #e5eff5;
  max-width: 100%;
  border-radius: 15px;
  padding: 24px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1200px) {
    height: 75px;
  }
`;

const RequiredHours = styled(BigLabel)`
  font-weight: 300;
  font-size: 32px;
  line-height: 32px;
  margin-top: 0px;
`;

const EligibleIcon = styled.img`
  height: 48px;
  width: 48px;
  @media only screen and (max-width: 1200px) {
    height: 28px;
    width: 28px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BenefitRow = ({label, hours, eligibility}) => (
  <Row
    gutter={16}
    style={{
      height: 72,
      paddingTop: 16,
      borderBottom: '1px solid #efefef',
      width: '100%',
    }}
  >
    <Col xs={14} xl={13}>
      <BenefitType>{label}</BenefitType>
    </Col>
    <Col xs={6} xl={6}>
      <RequiredHours>{hours}</RequiredHours>
    </Col>
    <Col xs={4} xl={5}>
      {eligibility ? (
        <IconContainer>
          <EligibleIcon src={checkSVG} alt="check-circle" />
        </IconContainer>
      ) : null}
    </Col>
  </Row>
);

const ColumnTitle = styled.div`
  font-weight: 500;
  line-height: 16px;
  color: #0f466a;
`;

const Header = ({month}) => (
  <Row gutter={16} style={{marginTop: 16, marginBottom: 24}}>
    <Col xs={0} xl={4}>
      <ColumnTitle style={{marginLeft: 8}}>
        {month.toUpperCase()} <br />
        HOURS
      </ColumnTitle>
    </Col>
    <Col xs={12} xl={10}>
      <ColumnTitle>
        {' '}
        BENEFIT
        <br /> TYPE{' '}
      </ColumnTitle>
    </Col>
    <Col xs={6} xl={5}>
      <ColumnTitle style={{marginLeft: 8}}>
        {' '}
        REQUIRED <br />
        HOURS{' '}
      </ColumnTitle>
    </Col>
    <Col xs={6} xl={5} style={{display: 'flex', justifyContent: 'center'}}>
      <ColumnTitle style={{marginLeft: 8}}>
        {moment(helpers.capitalize(month), 'MMMM')
          .add(1, 'months')
          .format('MMMM')
          .toUpperCase()}
        <br />
        ELIGIBILITY{' '}
      </ColumnTitle>
    </Col>
  </Row>
);

const MobileLabel = styled.span`
  margin-left: 8px;
  display: none;
  @media only screen and (max-width: 1024px) {
    display: inline;
  }
`;

class Benefits extends React.PureComponent {
  render() {
    return (
      <Query
        query={employeeReportByEmployeeId}
        fetchPolicy="cache-and-network"
        variables={{
          month: moment(helpers.capitalize(this.props.month), 'MMMM').format(
            'M'
          ),
          year: this.props.year,
          employeeId: this.props.employeeId,
        }}
      >
        {({loading, data, error}) => {
          if (loading) return <Loading />;
          if (error) return 'error';

          if (
            !data.employeeReportByEmployeeId ||
            !data.employeeReportByEmployeeId.benefits
          ) {
            return 'No data';
          }

          let report = data.employeeReportByEmployeeId;

          return (
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
              <Row gutter={16} style={{marginTop: 16}}>
                <Col xs={0} xl={24}>
                  <Header month={this.props.month} />
                </Col>
                <Col xs={24} xl={4}>
                  <HoursContainer>
                    <BigValue
                      style={{
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {report.hours}
                      <MobileLabel>
                        {this.props.month.toUpperCase()} HOURS
                      </MobileLabel>
                    </BigValue>
                  </HoursContainer>
                </Col>
                <Col xs={24} xl={0}>
                  <Header month={this.props.month} />
                </Col>
                <Col xs={24} xl={20}>
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
