import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import ErrorBlock from 'components/common/ErrorBlock';
import message from 'components/common/message';
import Background from 'components/common/GradientBackground';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.png';
import constants from 'lib/constants';
// APOLLO
import resetPassword from 'ApolloClient/Mutations/resetPassword';
import {graphql} from 'react-apollo';
import ErrorHelpers from 'lib/helpers/ErrorHelpers';
import GeneralHelpers from 'lib/helpers/GeneralHelpers';

const FormContainer = styled.div`
  width: 250px;
  margin: auto;
  max-width: 100%;
  padding-top: 96px;
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
  checkPassword = (password) => {
    return false;
  };
  onSubmit = async () => {
    try {
      this.setState({
        errors: [],
      });
      let errors = GeneralHelpers.passwordCheck(
        this.state.password,
        this.state.confirmPassword
      );

      if (errors && errors.length > 0) {
        return this.setState({
          errors,
        });
      }

      // set the form as loading
      this.setState({
        loading: true,
      });

      // call the mutation
      let res = await this.props.resetPassword({
        variables: {
          newPassword: this.state.password,
          token: this.props.match.params.token,
        },
      });
      // show a success message
      message.success('Password reset. Logging you in...');
      let {accessToken, refreshToken} = res.data.resetPassword.tokens;
      window.localStorage.setItem(constants.authTokenName, accessToken);
      window.localStorage.setItem(constants.refreshTokenName, refreshToken);
      this.setState({
        loading: false,
      });
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      this.setState({
        loading: false,
      });
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
                onChange={(e) => this.setState({password: e.target.value})}
              />
            </FormItem>
            <FormItem>
              <TextInput
                label="Confirm New Password"
                type="password"
                value={this.state.confirmPassword}
                onChange={(e) =>
                  this.setState({confirmPassword: e.target.value})
                }
              />
            </FormItem>
            {this.state.errors && this.state.errors.length > 0 && (
              <FormItem>
                <ErrorBlock errors={this.state.errors} />
              </FormItem>
            )}
            <Button onClick={this.onSubmit} style={{width: 150}}>
              {!this.state.loading ? ' Set password' : '...'}
            </Button>
            <FormItem>
              <TextButton onClick={() => this.props.history.push(`/login`)}>
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
