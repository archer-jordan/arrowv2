import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import FormItem from 'components/common/FormItem';
import message from 'components/common/message';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.png';
// LIB
import AuthHelpers from 'lib/helpers/AuthHelpers';
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
  margin-bottom: 32px;
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

// STYLED-COMPONENTS
// ========================================
const SuccessCard = () => (
  <div style={{minHeight: 257, paddingTop: 200}}>
    <div style={{textAlign: 'center'}}>
      <Icon
        style={{fontSize: 40, marginBottom: 10, color: '#fff'}}
        type="check-circle"
      />
      <h2 style={{textAlign: 'center', margin: 0, fontSize: 18, color: '#fff'}}>
        if your email exists in our system, you will be sent a password reset
        email
      </h2>
    </div>
  </div>
);

class AuthForgotPassword extends React.PureComponent {
  state = {
    email: null,
    emailSent: false,
    loading: false,
  };
  onSubmit = async () => {
    this.setState({loading: true});
    try {
      await AuthHelpers.sendPasswordResetEmail({email: this.state.email});
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
    this.setState({loading: false, emailSent: true});
    message.success('A recovery email has been sent to your inbox!', 4);
  };
  render() {
    return (
      <Background>
        {!this.state.emailSent ? (
          <FormContainer>
            {' '}
            <Logo src={logoWhiteSVG} alt="logo" />
            <div>
              <FormItem>
                <TextInput
                  label="Email"
                  value={this.state.email}
                  onChange={e => this.setState({email: e.target.value})}
                />
              </FormItem>
              <Button
                onClick={this.onSubmit}
                disabled={this.state.loading}
                style={{width: 150}}
              >
                Send reset email
              </Button>
              <FormItem>
                <TextButton onClick={() => this.props.history.push(`/login`)}>
                  Already have an account?
                </TextButton>
              </FormItem>
            </div>
          </FormContainer>
        ) : (
          <SuccessCard />
        )}
      </Background>
    );
  }
}

export default AuthForgotPassword;
