import React from 'react';
import CustomerStatusInput from 'components/inputs/CustomerStatusInput';

class Status extends React.PureComponent {
  render() {
    return (
      <div style={{width: 300}}>
        <CustomerStatusInput
          onChange={status => this.props.onSaveChanges({status})}
          value={this.props.customer.status}
        />
      </div>
    );
  }
}

export default Status;
