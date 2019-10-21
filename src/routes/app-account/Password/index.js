import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import message from 'components/common/message';

const FormContainer = styled.div`
  width: 250px;
  margin-right: auto;
  max-width: 100%;
`;

class Password extends React.PureComponent {
  state = {
    loading: false,
  };
  onSubmit = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false});
      message.success('Your password has been reset!');
    }, 2000);
  };
  render() {
    return (
      <div>
        <FormContainer>
          <div>
            <FormItem>
              <TextInput label="current password" type="password" dark />
            </FormItem>
            <FormItem>
              <TextInput label="new password" type="password" dark />
            </FormItem>
            <FormItem>
              <TextInput label="confirm new password" type="password" dark />
            </FormItem>
            <Button
              onClick={this.onSubmit}
              style={{width: 140}}
              disabled={this.state.loading}
            >
              {this.state.loading ? '...' : 'reset password'}
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default Password;
