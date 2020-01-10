import React from "react";
import styled from "styled-components";
import { validate } from "email-validator";
//COMPONENTS
import TextInput from "components/inputs/TextInput";
import Button from "components/common/Button";
import FormItem from "components/common/FormItem";
import ErrorBlock from "components/common/ErrorBlock";
// LIB
import logoWhiteSVG from "lib/media/arrow-logo-white.png";
import AuthHelpers from "lib/helpers/AuthHelpers";
// APOLLO
import ApolloClient from "ApolloClient/index.js";

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
    errors: []
  };
  onSubmit = async () => {
    // reset errors
    this.setState({ errors: [] });

    // check that user added an email
    if (!this.state.email) {
      return this.setState({ errors: ["Please provide an email"] });
    }
    // check if its a valid email
    if (!validate(this.state.email)) {
      return this.setState({ errors: ["That is not a valid email"] });
    }
    // check that they give a password
    if (!this.state.password) {
      return this.setState({ errors: ["Please provide a password"] });
    }

    this.setState({ loading: true });
    try {
      await AuthHelpers.handleLogin({
        email: this.state.email,
        password: this.state.password
      });
    } catch (err) {
      let errMessage = err.message.replace("GraphQL", "");
      if (err && err.message.includes("Incorrect password [403]")) {
        errMessage = "You have entered an invalid username or password";
      }
      return this.setState({
        loading: false,
        errors: [errMessage]
      });
    }
    await ApolloClient.resetStore();
  };

  onSuccessfulLogin = ({ access_token, refresh_token }) => {
    this.setState({ loading: false });
    setTimeout(() => window.location.reload(), 800);
  };

  render() {
    return (
      <Background>
        <div>
          <FormContainer>
            {" "}
            <Logo src={logoWhiteSVG} alt="logo" />
            <div>
              <FormItem>
                <TextInput
                  label="email address"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </FormItem>
              <FormItem>
                <TextInput
                  label="password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </FormItem>
              {this.state.errors && this.state.errors.length > 0 && (
                <FormItem>
                  <ErrorBlock errors={this.state.errors} />
                </FormItem>
              )}
              <Button
                onClick={this.onSubmit}
                style={{ width: 100 }}
                disabled={this.state.loading}
              >
                {this.state.loading ? "..." : "login"}
              </Button>
              <FormItem>
                <TextButton
                  onClick={() => this.props.history.push(`/forgot-password`)}
                >
                  Forgot your password?
                </TextButton>
              </FormItem>
              <FormItem>
                <TextButton
                  onClick={() => this.props.history.push(`/register`)}
                >
                  First time logging-in?
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
