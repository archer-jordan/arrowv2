import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import Icon from 'components/common/Icon';
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
      We've received your message. <br />
      Somebody will be in touch within one business day.{' '}
    </CompleteText>
  </FormContainer>
);

class AppSupport extends React.PureComponent {
  state = {
    loading: false,
    complete: false,
    name: this.props.currentUser && this.props.currentUser.firstName,
    email: this.props.currentUser && this.props.currentUser.email,
  };
  onSubmit = async () => {
    try {
      this.setState({loading: true});
      // validate
      if (!this.state.email) return null;

      // submit info to mutation
      await this.props.sendSupportMessage({
        variables: {
          params: {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
          },
        },
      });

      this.setState({loading: false, complete: true});
    } catch (err) {
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
            <FormItem>
              <TextInput
                label="Name"
                dark
                value={this.state.name}
                width={'400px'}
                onChange={e => this.setState({name: e.target.value})}
              />
            </FormItem>
            <FormItem>
              <TextInput
                label="Email"
                dark
                width={'400px'}
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})}
              />
            </FormItem>
            <FormItem>
              <TextInput
                label="Subject"
                value={this.state.subject}
                dark
                onChange={e => this.setState({subject: e.target.value})}
                width={'400px'}
              />
            </FormItem>
            <div style={{marginBottom: 16}}>
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
        </FormContainer>
      </div>
    );
  }
}

export default graphql(sendSupportMessage, {name: 'sendSupportMessage'})(
  AppSupport
);
