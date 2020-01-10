import React from 'react';
import numeral from 'numeral';
import TopContainer from 'components/common/TopContainer';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';

class Retirement extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <TopContainer>
            <div>
              {' '}
              <BigValue>
                ${numeral(this.props.report.totalRetirement).format('0,0.00')}
              </BigValue>
              <BigLabel>
                {this.props.report.labelForTotalRetirement ||
                  'TOTAL CONTRIBUTIONS TO RETIREMENT INCLUDING H&W & VHS'}{' '}
              </BigLabel>
            </div>
          </TopContainer>
        </div>
      </div>
    );
  }
}

export default Retirement;
