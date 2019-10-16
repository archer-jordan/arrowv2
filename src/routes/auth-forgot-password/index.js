import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.svg';

const FormContainer = styled.div`
  width: 300px;
  margin: auto;
  max-width: 100%;
  padding-top: 80px;
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

class AuthForgotPassword extends React.PureComponent {
  render() {
    return (
      <Background>
        <FormContainer>
          {' '}
          <Logo src={logoWhiteSVG} alt="logo" />
          <div>
            <FormItem>
              <TextInput label="Email" />
            </FormItem>
            <Button style={{width: 150}}>Send reset email</Button>
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

export default AuthForgotPassword;
