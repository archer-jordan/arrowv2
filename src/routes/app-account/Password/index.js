import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import message from 'components/common/message';
// LIB
import AuthHelpers from 'lib/helpers/AuthHelpers';

const FormContainer = styled.div`
  width: 250px;
  margin-right: auto;
  max-width: 100%;
`;

class Password extends React.PureComponent {
  state = {
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null,
    loading: false,
  };

  onSubmit = async () => {
    this.setState({loading: true});

    try {
      await AuthHelpers.changePassword({
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      });
    } catch (err) {
      this.setState({loading: false});
      console.log('err', err);
      return message.error(err.message || 'Something went wrong');
    }
    message.success('New password saved!');
    this.setState({
      loading: false,
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
    });
  };
  render() {
    let disabled =
      !this.state.oldPassword ||
      !this.state.newPassword ||
      !this.state.confirmNewPassword;
    return (
      <div>
        <FormContainer>
          <div>
            <FormItem>
              <TextInput
                label="current password"
                type="password"
                onChange={e => this.setState({oldPassword: e.target.value})}
                value={this.state.oldPassword}
                dark
              />
            </FormItem>
            <FormItem>
              <TextInput
                label="new password"
                type="password"
                onChange={e => this.setState({newPassword: e.target.value})}
                value={this.state.newPassword}
                dark
              />
            </FormItem>
            <FormItem>
              <TextInput
                label="confirm new password"
                type="password"
                onChange={e =>
                  this.setState({confirmNewPassword: e.target.value})
                }
                value={this.state.confirmNewPassword}
                dark
              />
            </FormItem>
            <Button
              onClick={this.onSubmit}
              style={{width: 140}}
              disabled={disabled || this.state.loading}
            >
              {!this.state.loading ? `reset password` : '...'}
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default Password;
