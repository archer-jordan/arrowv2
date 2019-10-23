import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import message from 'components/common/message';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.png';
import AuthHelpers from 'lib/helpers/AuthHelpers';
import ErrorHelpers from 'lib/helpers/ErrorHelpers';
// APOLLO
import ApolloClient from 'ApolloClient/index.js';

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
  width: 250px;
  margin-bottom: 40px;
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

class AuthLogin extends React.PureComponent {
  state = {
    loading: false,
  };
  onSubmit = async () => {
    this.setState({loading: true});
    try {
      await AuthHelpers.handleLogin({
        email: this.state.email,
        password: this.state.password,
      });
    } catch (err) {
      let errMessage = err.message.replace('GraphQL', '');
      if (err && err.message.includes('Incorrect password [403]')) {
        errMessage = 'You have entered an invalid username or password';
      }
      return this.setState({
        loading: false,
        errors: [ErrorHelpers.cleanErrorString(errMessage)],
      });
    }
    await ApolloClient.resetStore();
    setTimeout(() => this.props.history.push('/reports'), 1000);
  };

  onSuccessfulLogin = ({access_token, refresh_token}) => {
    this.setState({loading: false});
    setTimeout(() => window.location.reload(), 800);
  };

  render() {
    return (
      <Background>
        <div>
          <FormContainer>
            {' '}
            <Logo src={logoWhiteSVG} alt="logo" />
            <div>
              <FormItem>
                <TextInput
                  label="email address"
                  onChange={e => this.setState({email: e.target.value})}
                />
              </FormItem>
              <FormItem>
                <TextInput
                  label="password"
                  type="password"
                  onChange={e => this.setState({password: e.target.value})}
                />
              </FormItem>
              <Button
                onClick={this.onSubmit}
                style={{width: 100}}
                disabled={this.state.loading}
              >
                {this.state.loading ? '...' : 'login'}
              </Button>
              <FormItem>
                <TextButton
                  onClick={() => this.props.history.push(`/forgot-password`)}
                >
                  Forgot your password?
                </TextButton>
              </FormItem>
            </div>
          </FormContainer>
        </div>
      </Background>
    );
  }
}

export default AuthLogin;
