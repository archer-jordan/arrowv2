import React from 'react';
import styled from 'styled-components';
import {validate} from 'email-validator';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import ErrorBlock from 'components/common/ErrorBlock';
import FormItem from 'components/common/FormItem';
// LIB
import logoWhiteSVG from 'lib/media/arrow-logo-white.png';
// LIB
import ErrorHelpers from 'lib/helpers/ErrorHelpers';
// APOLLO
import {graphql} from 'react-apollo';
import registerAccount from 'ApolloClient/Mutations/registerAccount';

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

const Text = styled.div`
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
        if your email exists in our system, you will be sent a confirmation
        email
      </h2>
    </div>
  </div>
);

class AuthRegister extends React.PureComponent {
  state = {
    email: null,
    emailSent: false,
    loading: false,
    errors: [],
  };
  onSubmit = async () => {
    try {
      // check that user added an email
      if (!this.state.email) {
        return this.setState({errors: ['Please provide an email']});
      }
      // check if its a valid email
      if (!validate(this.state.email)) {
        return this.setState({errors: ['That is not a valid email']});
      }
      // if all is well, set the form to loading
      this.setState({loading: true});
      // fire off the mutation
      await this.props.registerAccount({
        variables: {
          email: this.state.email,
        },
      });
      // set emailSent as true so we can
      this.setState({loading: false, emailSent: true});
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
              {this.state.errors && this.state.errors.length > 0 && (
                <FormItem>
                  <ErrorBlock errors={this.state.errors} />
                </FormItem>
              )}
              <Button
                onClick={this.onSubmit}
                disabled={this.state.loading}
                style={{width: 150}}
              >
                Send me a link
              </Button>
              <FormItem>
                <Text>
                  Please provide your email address and we’ll send you a secure
                  link to create a password and access your account.
                </Text>
              </FormItem>
              {/* <FormItem>
                <TextButton onClick={() => this.props.history.push(`/login`)}>
                  Already created your password?
                </TextButton>
              </FormItem> */}
            </div>
          </FormContainer>
        ) : (
          <SuccessCard />
        )}
      </Background>
    );
  }
}

export default graphql(registerAccount, {name: 'registerAccount'})(
  AuthRegister
);
