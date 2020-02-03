import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import Input from 'components/inputs/Input';
import Icon from 'components/common/Icon';
import ErrorBlock from 'components/common/ErrorBlock';
import SupportTypeInput from 'components/inputs/SupportTypeInput';
import TextAreaInput from 'components/inputs/TextAreaInput';
// APOLLO CLIENT
import {graphql} from 'react-apollo';
import sendSupportMessage from 'ApolloClient/Mutations/sendSupportMessage';

const FormContainer = styled.div`
  width: 400px;
  margin-right: auto;
  max-width: 100%;
`;

const CompleteText = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 16px;
  color: ${p => p.theme.colors.neutral4};
`;

const Title = styled(CompleteText)`
  font-weight: 600;
  font-size: 18px;
  color: ${p => p.theme.colors.neutral1};
`;

// Shown after a successful submit
const SuccessState = () => (
  <FormContainer>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
      }}
    >
      <Icon type="check-circle" style={{fontSize: 70, color: '#57AE5B'}} />
    </div>
    <CompleteText>
      <Title>We've received your message. </Title>
      Our team will be in touch within one business day.{' '}
    </CompleteText>
  </FormContainer>
);

const getName = currentUser => {
  if (!currentUser) return null;
  if (currentUser.firstName && currentUser.lastName) {
    return `${currentUser.firstName} ${currentUser.lastName}`;
  }
  if (currentUser.firstName) {
    return `${currentUser.firstName}`;
  }
  return null;
};

class AppSupport extends React.PureComponent {
  state = {
    loading: false,
    complete: false,
    name: getName(this.props.currentUser),
    email: this.props.currentUser && this.props.currentUser.email,
    messageType: this.props.messageType,
    errors: [],
    // form errors
    emailError: null,
    messageError: null,
  };
  onSubmit = async () => {
    try {
      this.setState({loading: true});
      // validate
      if (!this.state.email) {
        return this.setState({
          emailError: 'Please provide an email',
          loading: false,
        });
      }
      if (!this.state.messageType) {
        return this.setState({
          messageTypeError: 'Please tell us how we can help',
          loading: false,
        });
      }

      // submit info to mutation
      await this.props.sendSupportMessage({
        variables: {
          params: {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
            customerId: this.props.currentUser.customerId,
            userId: this.props.currentUser.id,
            status: 'open',
            messageType: this.state.messageType,
          },
        },
      });

      this.setState({loading: false, complete: true});
    } catch (err) {
      this.setState({loading: false, errors: [err.message]});
      console.log(err);
    }
  };
  render() {
    // Show a success message after they successfully submit a message
    if (this.state.complete) {
      return <SuccessState />;
    }

    // show the form
    return (
      <div>
        <FormContainer>
          <div>
            <FormItem label="Name">
              <Input
                label="Name"
                dark
                value={this.state.name}
                width={'400px'}
                onChange={e => this.setState({name: e.target.value})}
              />
            </FormItem>
            <FormItem label="Email" error={this.state.emailError}>
              <Input
                label="Email"
                dark
                width={'400px'}
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})}
              />
            </FormItem>
            <FormItem label="Subject">
              <Input
                label="Subject"
                value={this.state.subject}
                dark
                onChange={e => this.setState({subject: e.target.value})}
                width={'400px'}
              />
            </FormItem>
            <FormItem
              label="I need help with..."
              error={this.state.messageTypeError}
            >
              <SupportTypeInput
                value={this.state.messageType}
                showAllOption={false}
                onChange={messageType => this.setState({messageType})}
              />
            </FormItem>
            <div style={{marginBottom: 16, marginTop: 24}}>
              <TextAreaInput
                placeholder="What can we help you with? "
                rows="6"
                value={this.state.message}
                onChange={message => this.setState({message})}
                dark
              />
            </div>
            <Button
              onClick={this.onSubmit}
              style={{width: 140}}
              disabled={this.state.loading}
            >
              {this.state.loading ? '...' : 'Submit'}
            </Button>
          </div>
          {this.state.errors && this.state.errors.length > 0 && (
            <ErrorBlock errors={this.state.errors} />
          )}
        </FormContainer>
      </div>
    );
  }
}

export default graphql(sendSupportMessage, {name: 'sendSupportMessage'})(
  AppSupport
);
