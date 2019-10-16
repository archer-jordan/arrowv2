import React from 'react';
import styled from 'styled-components';
import TopContainer from 'components/common/TopContainer';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';

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

const MOCK_DATA = [
  {label: 'Limited Medical', value: 9940220},
  {label: 'Teledoc', value: 940220},
  {label: 'MEC', value: 9940220},
  {label: 'TERM LIFE INSURANCE', value: 940220},
];

const ValueBlock = ({value, label}) => (
  <ValueBlockContainer>
    <ValueItemLabel>{label}</ValueItemLabel>
    <ValueItemValue>
      {(value / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}
    </ValueItemValue>
  </ValueBlockContainer>
);

class Benefits extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <TopContainer style={{marginBottom: 0}}>
            <div>
              {' '}
              <BigValue>$6,993.42</BigValue>
              <BigLabel>TOTAL FRINGE BENEFITS SPEND*</BigLabel>
            </div>
          </TopContainer>
          <p style={{textAlign: 'right'}}>
            *Including H&W, VHS & Administrative Costs
          </p>
        </div>
        <div style={{paddingLeft: 24}}>
          {MOCK_DATA.map(item => {
            return <ValueBlock key={item.label} {...item} />;
          })}{' '}
        </div>
      </div>
    );
  }
}

export default Benefits;
