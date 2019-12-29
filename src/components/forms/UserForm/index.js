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
import ErrorBlock from 'components/common/ErrorBlock';
// APOLLO
import emailAlreadyExists from 'ApolloClient/Queries/emailAlreadyExists';
import {Query} from 'react-apollo';

const RedText = styled.div`
  color: ${p => p.theme.colors.red2};
`;

const PinkText = styled.div`
  color: ${p => p.theme.colors.primary1};
  cursor: pointer;
`;

const GreenText = styled.div`
  color: #0e7817;
`;

const Checkbox = styled.div`
  cursor: pointer;
  background: ${p => p.theme.colors.neutral9};
  height: 25px;
  width: 25px;
  border-radius: 5px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  &:hover {
    background: ${p =>
      !p.checked ? p.theme.colors.neutral8 : p.theme.colors.neutral9};
  }
`;

const CheckTitle = styled.div`
  font-weight: 600;
  font-size: 17px;
`;

const CheckCaption = styled.div`
  color: ${p => p.theme.colors.neutral7};
  line-height: 14px;
  font-size: 14px;
`;

const Checked = styled.div`
  background: ${p => p.theme.colors.primary4};
  height: 15px;
  width: 15px;
  border-radius: 3px;
`;

const CheckItem = ({checked, onChange, title, caption}) => {
  return (
    <Row style={{marginTop: 24}}>
      {' '}
      <Col xs={3}>
        <Checkbox checked={checked} onClick={() => onChange(!checked)}>
          {checked && <Checked />}
        </Checkbox>
      </Col>
      <Col xs={21}>
        <CheckTitle>{title}</CheckTitle>
        <CheckCaption>{caption}</CheckCaption>
      </Col>
    </Row>
  );
};

const CheckForEmail = ({
  onCompleted,
  finalEmail,
  email,
  makeEmployeeAnAdmin,
}) => (
  <React.Fragment>
    {finalEmail && !validate(finalEmail) && (
      <RedText>
        <Icon type="close-circle" style={{marginRight: 4}} />
        Not a valid email
      </RedText>
    )}
    {finalEmail && validate(finalEmail) && (
      <Query
        query={emailAlreadyExists}
        variables={{email: finalEmail}}
        onCompleted={onCompleted}
      >
        {({data, loading, error}) => {
          if (loading)
            return (
              <div>
                <Icon type="loading" />
              </div>
            );
          if (error) return 'Error';
          let {exists, errors} = data.emailAlreadyExists;
          return (
            <div>
              {/* If email exists, and the user is also an employee, show this block and allow the user to make that employee an admin */}
              {exists &&
                errors &&
                errors.includes('Employee with this email exists') && (
                  <div>
                    <RedText>
                      <Icon type="close-circle" style={{marginRight: 4}} />
                      <strong>{email}</strong> is not available.
                    </RedText>
                    An employee user with this email already exists. <br />
                    <PinkText onClick={makeEmployeeAnAdmin}>
                      {' '}
                      Click here to make them a company admin
                    </PinkText>
                  </div>
                )}
              {/* If email does not exist, show this block */}
              {!exists && (
                <GreenText>
                  <Icon type="check-circle" style={{marginRight: 4}} />
                  <strong>{email}</strong> is available
                </GreenText>
              )}
              {/* If email exists and we have no errors, show this block */}
              {exists && !errors && (
                <RedText>
                  <Icon type="close-circle" style={{marginRight: 4}} />
                  <strong>{email}</strong> is not available
                </RedText>
              )}
            </div>
          );
        }}
      </Query>
    )}
  </React.Fragment>
);

class UserForm extends React.PureComponent {
  state = {
    email: this.props.email || null,
    finalEmail: this.props.email || null,
    firstName: this.props.firstName || null,
    lastName: this.props.lastName || null,
    title: this.props.title || null,
    phone: this.props.phone || null,
    emailExists: null,
    permissions: this.props.permissions || [],
    errors: [],
  };
  onSave = () => {
    // if the email has been changed, we need to make sure it's not already taken
    if (this.props.email !== this.state.finalEmail) {
      // if email exists, don't submit
      if (this.state.emailExists) {
        return null;
      }
      // if emailExists is still null, don't submit
      if (this.state.emailExists == null) {
        return null;
      }
    }

    if (!this.state.finalEmail) {
      return this.setState({errors: ['Please provide an email']});
    }
    if (!this.state.firstName) {
      return this.setState({errors: ['Please provide a first name']});
    }
    if (!this.state.lastName) {
      return this.setState({errors: ['Please provide a last name']});
    }

    this.props.onSubmit({
      id: this.state.id,
      email: this.state.finalEmail,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      title: this.state.title,
      phone: this.state.phone,
      permissions: this.state.permissions,
    });
  };
  handleFilter = debounce(finalEmail => {
    this.setState({finalEmail});
  }, 250);
  onPermissionChange = (value, type) => {
    return value
      ? this.setState({
          permissions: [...this.state.permissions, type],
        })
      : this.setState({
          permissions: this.state.permissions.filter(item => item !== type),
        });
  };
  getDisabled = () => {
    if (this.state.emailExists) {
      return true;
    }
    let emailHasChanged = this.state.finalEmail !== this.props.email;
    if (emailHasChanged && this.state.emailExists === null) {
      return true;
    }
    if (!this.state.finalEmail) {
      return true;
    }
    if (!this.state.firstName) {
      return true;
    }
    if (!this.state.lastName) {
      return true;
    }
    return false;
  };
  render() {
    let disabled = this.getDisabled();
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
          <FormItem label="First Name" required>
            <Input
              value={this.state.firstName}
              onChange={e => this.setState({firstName: e.target.value})}
            />
          </FormItem>
        </Col>{' '}
        <Col xs={24}>
          <FormItem label="Last Name" required>
            <Input
              value={this.state.lastName}
              onChange={e => this.setState({lastName: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={12}>
          <FormItem label="Title">
            <Input
              value={this.state.title}
              onChange={e => this.setState({title: e.target.value})}
            />
          </FormItem>{' '}
        </Col>
        <Col xs={12}>
          <FormItem label="Phone">
            <Input
              value={this.state.phone}
              onChange={e => this.setState({phone: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={24}>
          <FormItem label="Email" required>
            <Input
              value={this.state.email}
              type="search"
              onChange={e => {
                this.setState({email: e.target.value});
                this.handleFilter(e.target.value);
              }}
            />
            {/*
              If the final email does not match the incoming email or finalEmail is null, 
              then let's do a server check to see if the email already exists 
            */}
            {!this.state.finalEmail ||
              (this.state.finalEmail !== this.props.email && (
                <CheckForEmail
                  finalEmail={this.state.finalEmail}
                  email={this.state.email}
                  makeEmployeeAnAdmin={() => {
                    this.props.makeEmployeeAnAdmin(this.state.finalEmail);
                  }}
                  onCompleted={data =>
                    this.setState({
                      emailExists: data.emailAlreadyExists.exists,
                    })
                  }
                />
              ))}
            {this.props.showPermissions && (
              <div style={{marginTop: 48, marginBottom: 32}}>
                <CheckItem
                  checked={this.state.permissions.includes('viewCompanyData')}
                  title="View Summary Company Data"
                  caption="(read-only)"
                  onChange={value =>
                    this.onPermissionChange(value, 'viewCompanyData')
                  }
                />
                <CheckItem
                  checked={this.state.permissions.includes('viewEmployeeData')}
                  title="View Data on Employees"
                  caption="(read-only)"
                  onChange={value =>
                    this.onPermissionChange(value, 'viewEmployeeData')
                  }
                />
                <CheckItem
                  checked={this.state.permissions.includes('manageUsers')}
                  title="Create Admin Users"
                  caption="(this company only: create, read, update, delete)"
                  onChange={value =>
                    this.onPermissionChange(value, 'manageUsers')
                  }
                />
              </div>
            )}
          </FormItem>
          {this.state.errors && this.state.errors.length > 0 && (
            <FormItem>
              <ErrorBlock errors={this.state.errors} />
            </FormItem>
          )}
        </Col>{' '}
        <Col xs={24}>
          <FormItem>
            <Button
              grey
              style={{width: 100, marginRight: 16}}
              onClick={this.props.onCancel}
            >
              Cancel
            </Button>
            <Button
              disabled={disabled}
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

UserForm.defaultProps = {
  showPermissions: true,
};

export default UserForm;
