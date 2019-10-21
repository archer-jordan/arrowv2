import React from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import Icon from 'components/common/Icon';
import TextAreaInput from 'components/inputs/TextAreaInput';

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

class AppSupport extends React.PureComponent {
  state = {
    loading: false,
    complete: false,
  };
  onSubmit = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false, complete: true});
    }, 2000);
  };
  render() {
    if (this.state.complete) {
      return (
        <FormContainer>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 32,
            }}
          >
            <Icon
              type="check-circle"
              style={{fontSize: 70, color: '#57AE5B'}}
            />
          </div>
          <CompleteText>
            We've received your message. <br />
            Somebody will be in touch within one business day.{' '}
          </CompleteText>
        </FormContainer>
      );
    }
    return (
      <div>
        <FormContainer>
          <div>
            <FormItem>
              <TextInput label="Name" dark width={'400px'} />
            </FormItem>
            <FormItem>
              <TextInput label="Email" dark width={'400px'} />
            </FormItem>
            <FormItem>
              <TextInput label="Subject" dark width={'400px'} />
            </FormItem>
            <div style={{marginBottom: 16}}>
              <TextAreaInput
                placeholder="What can we help you with? "
                rows="6"
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

export default AppSupport;
