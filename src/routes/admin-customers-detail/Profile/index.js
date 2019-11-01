import React from 'react';
import CustomerForm from 'components/forms/CustomerForm';

class Profile extends React.PureComponent {
  render() {
    return (
      <div>
        <CustomerForm
          {...this.props.customer}
          onSubmit={this.props.onSaveChanges}
          loading={this.props.saving}
          onCancel={null}
        />
      </div>
    );
  }
}

export default Profile;
