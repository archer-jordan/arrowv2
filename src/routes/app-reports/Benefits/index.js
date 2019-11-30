import React from 'react';
import styled from 'styled-components';
import TopContainer from 'components/common/TopContainer';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
import numeral from 'numeral';

const ValueBlockContainer = styled.div`
  height: 75px;
  width: 200px;
  border-bottom: 2px solid ${p => p.theme.colors.neutral9};
  margin-bottom: 24px;
`;

const ValueItemLabel = styled(BigLabel)``;

const ValueItemValue = styled(BigValue)`
  font-size: 28px;
  letter-spacing: 1.5px;
`;

const Caption = styled.p`
  @media only screen and (max-width: 414px) {
    margin-bottom: 32px;
  }
`;

const ValueBlock = ({value, label}) => (
  <ValueBlockContainer>
    <ValueItemLabel>{label}</ValueItemLabel>
    <ValueItemValue>${numeral(value).format('0,0.00')}</ValueItemValue>
  </ValueBlockContainer>
);

class Benefits extends React.PureComponent {
  render() {
    const {report} = this.props;
    return (
      <div>
        <div>
          <TopContainer>
            <div>
              {' '}
              <BigValue>
                ${numeral(report.totalFringeBenefitsSpend).format('0,0.00')}
              </BigValue>
              <BigLabel>
                {report.totalFringeBenefitsSpendLabel ||
                  'TOTAL FRINGE BENEFITS SPEND*'}
              </BigLabel>
            </div>
          </TopContainer>
          <Caption style={{textAlign: 'right'}}>
            *Including H&W, VHS & Administrative Costs
          </Caption>
        </div>
        <div style={{paddingLeft: 24}}>
          {report.benefits.map(benefit => {
            return <ValueBlock key={benefit.label} {...benefit} />;
          })}{' '}
        </div>
      </div>
    );
  }
}

export default Benefits;
