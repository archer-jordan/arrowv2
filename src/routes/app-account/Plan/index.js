import React from 'react';
import Button from 'components/common/Button';

class Plan extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <Button style={{width: 160}}>Download plan pdf</Button>
        </div>
      </div>
    );
  }
}

export default Plan;
