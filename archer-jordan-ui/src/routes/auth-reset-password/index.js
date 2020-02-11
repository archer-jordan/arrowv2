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
import ErrorHelpers from 'lib/helpers/ErrorHelpers';
import GeneralHelpers from 'lib/helpers/GeneralHelpers';
import constants from 'lib/constants';
// APOLLO
import resetPassword from 'ApolloClient/Mutations/resetPassword';
import {graphql} from 'react-apollo';

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
      // reset errors state
      this.setState({
        errors: [],
        loading: true,
      });

      // use the helper to check for errors
      let errors = GeneralHelpers.passwordCheck(
        this.state.password,
        this.state.confirmPassword
      );

      // if any errors exist, stop here and set the errors state
      if (errors && errors.length > 0) {
        return this.setState({
          errors,
          loading: true,
        });
      }

      // call mutation to reset password
      let res = await this.props.resetPassword({
        variables: {
          newPassword: this.state.password,
          token: this.props.match.params.token,
        },
      });

      // shoot off a success message
      message.success('Password reset. Logging you in...');

      // pull out the access token and refresh token
      let {accessToken, refreshToken} = res.data.resetPassword.tokens;

      // set items in local storage
      window.localStorage.setItem(constants.authTokenName, accessToken);
      window.localStorage.setItem(constants.refreshTokenName, refreshToken);

      // reload the page
      window.location.reload();
    } catch (err) {
      ErrorHelpers.handleError(err);
      return this.setState({
        errors: [err],
        loading: true,
      });
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
