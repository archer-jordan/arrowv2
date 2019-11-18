import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import message from 'components/common/message';
import ErrorBlock from 'components/common/ErrorBlock';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.png';
// APOLLO
import resetPassword from 'ApolloClient/Mutations/resetPassword';
import {graphql} from 'react-apollo';
import ErrorHelpers from 'lib/helpers/ErrorHelpers';

const FormContainer = styled.div`
  width: 250px;
  margin: auto;
  max-width: 100%;
  padding-top: 96px;
`;

const Background = styled.div`
  background-image: linear-gradient(to top, #145d91, #0e3456);
  height: 100%;
`;

const Logo = styled.img`
  display: block;
  margin: auto;
  height: 75px;
  margin-bottom: 72px;
`;

const TextButton = styled.button`
  color: #8cb3cd;
  font-size: 16px;
  padding: 0px;
  background: transparent;
  border: 0px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

class AuthResetPassword extends React.PureComponent {
  state = {
    loading: false,
    password: null,
    confirmPassword: null,
    errors: [],
  };
  onSubmit = async () => {
    try {
      // make sure password has been filled in
      if (!this.state.password) {
        return this.setState({errors: ['Please provide an password']});
      }
      // make sure password is at least 6 characters
      if (this.state.password.length < 6) {
        return this.setState({
          errors: [
            'Passwords should be at least 6 characters with at least one special character',
          ],
        });
      }
      // make sure it includes a special character
      if (!this.state.password.match(/[_\W0-9]/)) {
        return this.setState({
          errors: ['Passwords should be include one special character'],
        });
      }
      // make sure the confirmPassword input has been filled in
      if (!this.state.confirmPassword) {
        return this.setState({errors: ['Please confirm your password']});
      }
      //
      if (this.state.confirmPassword !== this.state.password) {
        return this.setState({errors: ['Your passwords do not match']});
      }
      let res = await this.props.resetPassword({
        variables: {
          newPassword: this.state.password,
          token: this.props.match.params.token,
        },
      });
      message.success('Password reset. Logging you in...');
      console.log(res);
      let {accessToken, refreshToken} = res.data.resetPassword.tokens;

      console.log(accessToken);
      console.log(refreshToken);
      window.localStorage.setItem('arrow_access_token', accessToken);
      window.localStorage.setItem('arrow_refresh_token', refreshToken);
      window.location.reload();
    } catch (err) {
      ErrorHelpers.handleError(err);
    }
  };
  render() {
    return (
      <Background>
        <FormContainer>
          {' '}
          <Logo src={logoWhiteSVG} alt="logo" />
          <div>
            <FormItem>
              <TextInput
                label="New Password"
                type="password"
                value={this.state.password}
                onChange={e => this.setState({password: e.target.value})}
              />
            </FormItem>
            <FormItem>
              <TextInput
                label="Confirm New Password"
                type="password"
                value={this.state.confirmPassword}
                onChange={e => this.setState({confirmPassword: e.target.value})}
              />
            </FormItem>
            {this.state.errors && this.state.errors.length > 0 && (
              <FormItem>
                <ErrorBlock errors={this.state.errors} />
              </FormItem>
            )}
            <Button onClick={this.onSubmit} style={{width: 150}}>
              Reset password
            </Button>
            <FormItem>
              <TextButton
                onClick={() => this.props.history.push(`/forgot-password`)}
              >
                Already have an account?
              </TextButton>
            </FormItem>
          </div>
        </FormContainer>
      </Background>
    );
  }
}

export default graphql(resetPassword, {name: 'resetPassword'})(
  AuthResetPassword
);
