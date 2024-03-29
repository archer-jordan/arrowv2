import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import EligibilityCard from './EligibilityCard';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
import TopContainer from 'components/common/TopContainer';

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
class Eligibility extends React.PureComponent {
  render() {
    const {report} = this.props;

    return (
      <div>
        <TopContainer>
          {' '}
          <Row style={{width: '100%'}}>
            {' '}
            <Col xs={24} md={9} lg={7}>
              <BigValue>{report.totalEmployees}</BigValue>
              <BigLabel>Total Employees</BigLabel>{' '}
            </Col>
            <Col xs={24} md={8} lg={8}>
              <MobileWrapper>
                <BigValue>{report.activeThisMonth}</BigValue>
                <BigLabel>Active this month</BigLabel>{' '}
              </MobileWrapper>
            </Col>
            <Col xs={24} md={7} lg={9} />
          </Row>
        </TopContainer>
        {report.captionForEligibility && (
          <Caption style={{textAlign: 'right'}}>
            {report.captionForEligibility}
          </Caption>
        )}
        <Row style={{paddingBottom: 64}}>
          {' '}
          {report.eligibility.map((benefit, i) => {
            return (
              <Col key={benefit.label} xs={12} md={6}>
                <EligibilityCard
                  card={{
                    label: benefit.label,
                    value: benefit.employees,
                    comparison: report.activeThisMonth - benefit.employees,
                    type: 'Employees',
                  }}
                  noBorder={(i + 1) % 4 === 0 && i !== 0}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default Eligibility;
