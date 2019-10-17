import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import message from 'components/common/message';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.png';

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
  onSubmit = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false});
      this.props.history.push('/reports');
      message.success('Welcome back!');
    }, 2000);
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
                <TextInput label="email address" />
              </FormItem>
              <FormItem>
                <TextInput label="password" type="password" />
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
