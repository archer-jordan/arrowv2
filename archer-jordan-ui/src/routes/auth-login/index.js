import React from 'react';
import styled from 'styled-components';
import {validate} from 'email-validator';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import ErrorBlock from 'components/common/ErrorBlock';
import Background from 'components/common/GradientBackground';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.png';
import AuthHelpers from 'lib/helpers/AuthHelpers';
// APOLLO
import ApolloClient from 'ApolloClient/index.js';

const FormContainer = styled.form`
  width: 250px;
  margin: auto;
  max-width: 100%;
  padding-top: 96px;
`;

// const Background = styled.div`
//   background-image: linear-gradient(336deg, #004759, #0095a3);
//   height: 100%;
// `;

const Logo = styled.img`
  display: block;
  margin: auto;
  width: 250px;
  margin-bottom: 40px;
`;

const TextButton = styled.button`
  color: #fff;
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
    errors: [],
  };
  onSubmit = async (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    // reset errors
    this.setState({errors: []});

    // check that user added an email
    if (!this.state.email) {
      return this.setState({errors: ['Please provide an email']});
    }
    // check if its a valid email
    if (!validate(this.state.email)) {
      return this.setState({errors: ['That is not a valid email']});
    }
    // check that they give a password
    if (!this.state.password) {
      return this.setState({errors: ['Please provide a password']});
    }

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
        errors: [errMessage],
      });
    }
    await ApolloClient.resetStore();
  };

  onSuccessfulLogin = ({access_token, refresh_token}) => {
    this.setState({loading: false});
    setTimeout(() => window.location.reload(), 800);
  };

  render() {
    return (
      <Background>
        <div>
          <FormContainer onSubmit={this.onSubmit}>
            {' '}
            <Logo src={logoWhiteSVG} alt="logo" />
            <div>
              <FormItem>
                <TextInput
                  label="email address"
                  value={this.state.email}
                  onChange={(e) => this.setState({email: e.target.value})}
                />
              </FormItem>
              <FormItem>
                <TextInput
                  label="password"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({password: e.target.value})}
                />
              </FormItem>
              {this.state.errors && this.state.errors.length > 0 && (
                <FormItem>
                  <ErrorBlock errors={this.state.errors} />
                </FormItem>
              )}
              <Button
                onClick={this.onSubmit}
                style={{width: 100}}
                type="submit"
                disabled={this.state.loading}
              >
                {this.state.loading ? '...' : 'login'}
              </Button>
              <FormItem>
                <TextButton
                  onClick={() => this.props.history.push(`/forgot-password`)}
                  style={{marginBottom: 8}}
                >
                  <span style={{color: '#00BFCB'}}>I forgot my</span>{' '}
                  <span style={{textDecoration: 'underline'}}>password</span>
                </TextButton>
                <TextButton
                  onClick={() => this.props.history.push(`/register`)}
                >
                  <span style={{color: '#00BFCB'}}>First time user?</span>
                  <span style={{textDecoration: 'underline'}}> click here</span>
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
