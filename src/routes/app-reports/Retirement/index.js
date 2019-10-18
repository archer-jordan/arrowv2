import React from 'react';
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
              <BigValue>$15,679.85</BigValue>
              <BigLabel>
                TOTAL CONTRIBUTIONS TO RETIREMENT INCLUDING H&W & VHS{' '}
              </BigLabel>
            </div>
          </TopContainer>
        </div>
      </div>
    );
  }
}

export default Retirement;
