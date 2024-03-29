import React from 'react';
import styled from 'styled-components';
import Background from 'components/common/GradientBackground';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.png';

const FormContainer = styled.div`
  width: 350px;
  margin: auto;
  max-width: 100%;
  padding-top: 96px;
`;

const Logo = styled.img`
  display: block;
  margin: auto;
  width: 250px;
  margin-bottom: 40px;
`;

const Text = styled.div`
  font-size: 32px;
  text-align: center;
  color: #fff;
`;

class PublicHome extends React.PureComponent {
  render() {
    return (
      <Background>
        <FormContainer>
          <Logo src={logoWhiteSVG} alt="logo" />
          <Text>404 page not found</Text>
        </FormContainer>
      </Background>
    );
  }
}

export default PublicHome;
