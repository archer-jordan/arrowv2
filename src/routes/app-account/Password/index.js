import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import message from 'components/common/message';
import ErrorBlock from 'components/common/ErrorBlock';
// LIB
import AuthHelpers from 'lib/helpers/AuthHelpers';
import GeneralHelpers from 'lib/helpers/GeneralHelpers';

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
    errors: [],
  };

  onSubmit = async () => {
    try {
      this.setState({
        errors: [],
      });
      let errors = GeneralHelpers.passwordCheck(
        this.state.newPassword,
        this.state.confirmNewPassword
      );

      if (errors && errors.length > 0) {
        return this.setState({
          errors,
        });
      }

      // set loading
      this.setState({loading: true});
      // await the change password mutation
      await AuthHelpers.changePassword({
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      });
      // show the user a success message
      message.success('Your password was successfully changed...');
      // reset all the values
      this.setState({
        loading: false,
        oldPassword: undefined,
        newPassword: undefined,
        confirmNewPassword: undefined,
      });
    } catch (err) {
      this.setState({loading: false});
      console.log('err', err);
      return message.error(err.message || 'Something went wrong');
    }
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
            {this.state.errors && this.state.errors.length > 0 && (
              <FormItem>
                <ErrorBlock errors={this.state.errors} />
              </FormItem>
            )}
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
