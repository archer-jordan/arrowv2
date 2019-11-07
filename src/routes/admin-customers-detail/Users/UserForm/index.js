import React from 'react';
import styled from 'styled-components';
import {debounce} from 'lodash';
import {validate} from 'email-validator';
import Input from 'components/inputs/Input';
import FormItem from 'components/common/FormItem';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
// APOLLO
import emailAlreadyExists from 'ApolloClient/Queries/emailAlreadyExists';
import {Query} from 'react-apollo';

const RedText = styled.div`
  color: ${p => p.theme.colors.red2};
`;

const GreenText = styled.div`
  color: #0e7817;
`;

class UserForm extends React.PureComponent {
  state = {
    email: null,
    finalEmail: null,
    emailExists: null,
  };
  onSave = () => {
    if (this.state.emailExists) {
      return null;
    }
    if (this.state.emailExists == null) {
      return null;
    }
    console.log(this.state.emailExists);
    return null;
    this.props.onSubmit({
      id: this.state.id,
      email: this.state.finalEmail,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  };
  handleFilter = debounce(finalEmail => {
    this.setState({finalEmail});
  }, 250);
  render() {
    return (
      <Row
        style={{
          width: 450,
          marginBottom: 16,
          padding: 16,
          maxWidth: '100%',
        }}
        gutter={16}
      >
        <Col xs={24}>
          <FormItem label="First Name">
            <Input
              value={this.state.firstName}
              onChange={e => this.setState({firstName: e.target.value})}
            />
          </FormItem>
        </Col>{' '}
        <Col xs={24}>
          <FormItem label="Last Name">
            <Input
              value={this.state.lastName}
              onChange={e => this.setState({lastName: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={24}>
          <FormItem label="Email">
            <Input
              value={this.state.email}
              type="search"
              onChange={e => {
                this.setState({email: e.target.value});
                this.handleFilter(e.target.value);
              }}
              //onChange={e => this.setState({email: e.target.value})}
            />
            {this.state.finalEmail && !validate(this.state.finalEmail) && (
              <RedText>
                <Icon type="close-circle" style={{marginRight: 4}} />
                Not a valid email
              </RedText>
            )}
            {this.state.finalEmail && validate(this.state.finalEmail) && (
              <Query
                query={emailAlreadyExists}
                variables={{email: this.state.finalEmail}}
                onCompleted={data =>
                  this.setState({emailExists: data.emailAlreadyExists.exists})
                }
              >
                {({data, loading, error}) => {
                  if (loading)
                    return (
                      <div>
                        <Icon type="loading" />
                      </div>
                    );
                  if (error) return 'Error';
                  return (
                    <div>
                      {!data.emailAlreadyExists.exists ? (
                        <GreenText>
                          <Icon type="check-circle" style={{marginRight: 4}} />
                          Email does not exist
                        </GreenText>
                      ) : (
                        <RedText>
                          <Icon type="close-circle" style={{marginRight: 4}} />
                          Email already exists
                        </RedText>
                      )}
                    </div>
                  );
                }}
              </Query>
            )}
          </FormItem>
        </Col>{' '}
        <Col xs={24}>
          <FormItem>
            <Button grey style={{width: 90}} onClick={this.props.onCancel}>
              Cancel
            </Button>
            <Button
              disabled={
                this.state.emailExists || this.state.emailExists === null
              }
              style={{width: 140}}
              onClick={this.onSave}
            >
              Save Changes
            </Button>
          </FormItem>
        </Col>{' '}
        <Col xs={12} />
      </Row>
    );
  }
}

export default UserForm;
