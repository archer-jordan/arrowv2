import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import FormItem from 'components/common/FormItem';
import Input from 'components/inputs/Input';
import DateInput from 'components/inputs/DatePicker';
import EmployeeStatusType from 'components/inputs/EmployeeStatusType';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import moment from 'moment';
// APOLLO
import {Query} from 'react-apollo';
import employeeIdAlreadyExists from 'ApolloClient/Queries/employeeIdAlreadyExists';

const RedText = styled.div`
  color: ${p => p.theme.colors.red2};
`;

const GreenText = styled.div`
  color: #0e7817;
`;

const Container = styled.div`
  min-height: 200px;
  width: 700px;
  max-width: 100%;
  border-radius: 5px;
`;

const AssignedIdCheck = ({editing, assignedId, oldAssigned, customerId}) => (
  <React.Fragment>
    {!editing && assignedId !== oldAssigned && (
      <React.Fragment>
        {assignedId && assignedId.length < 3 && (
          <RedText>
            <Icon type="close-circle" style={{marginRight: 4}} />
            Please input at least 3 characters
          </RedText>
        )}
        {assignedId && assignedId.length >= 3 && (
          <Query
            query={employeeIdAlreadyExists}
            variables={{assignedId, customerId}}
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
                  {!data.employeeIdAlreadyExists.exists ? (
                    <GreenText>
                      <Icon type="check-circle" style={{marginRight: 4}} />
                      <strong>{assignedId}</strong> is available
                    </GreenText>
                  ) : (
                    <RedText>
                      <Icon type="close-circle" style={{marginRight: 4}} />
                      <strong>{assignedId}</strong> is not available
                    </RedText>
                  )}
                </div>
              );
            }}
          </Query>
        )}
      </React.Fragment>
    )}
  </React.Fragment>
);

class EmployeeForm extends React.PureComponent {
  state = {
    lastName: this.props.lastName || null,
    firstName: this.props.firstName || null,
    assignedId: this.props.assignedId || null,
    status: this.props.status || null,
    email: this.props.email || null,
    dob: this.props.dob ? moment(parseInt(this.props.dob)) : null,
    hireDate: this.props.hireDate
      ? moment(parseInt(this.props.hireDate))
      : moment(),
    // location
    street: this.props.street || null,
    zip: this.props.zip || null,
    city: this.props.city || null,
    state: this.props.state || null,
  };
  onSubmit = () => {
    if (!this.state.assignedId) {
      return null;
    }
    let newData = {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      assignedId: this.state.assignedId,
      email: this.state.email,
      status: this.state.status && this.state.status.toLowerCase(),
      hireDate: this.state.hireDate.valueOf().toString(),
      dob: this.state.dob.valueOf().toString(),
      // location
      street: this.state.street,
      zip: this.state.zip,
      city: this.state.city,
      state: this.state.state,
    };
    this.props.onSubmit(newData);
  };
  render() {
    return (
      <Container>
        <Row gutter={16}>
          <Col xs={12}>
            <FormItem label="Last Name">
              <Input
                value={this.state.lastName}
                onChange={e => this.setState({lastName: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="Employer Assigned ID">
              <Input
                value={this.state.assignedId}
                onChange={e => this.setState({assignedId: e.target.value})}
              />
              <AssignedIdCheck
                editing={this.props.editing}
                assignedId={this.state.assignedId}
                oldAssigned={this.props.assignedId}
                customerId={this.props.customerId}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="First Name">
              <Input
                value={this.state.firstName}
                onChange={e => this.setState({firstName: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="Hire Date">
              <DateInput
                value={this.state.hireDate}
                onChange={hireDate => this.setState({hireDate})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="Email">
              <Input
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="Status">
              <EmployeeStatusType
                value={this.state.status}
                onChange={status => this.setState({status})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="DOB">
              <DateInput
                value={this.state.dob}
                onChange={dob => this.setState({dob})}
              />
            </FormItem>
          </Col>{' '}
          <Col xs={12}>
            <div style={{height: 90}} />
          </Col>
          <Col xs={12}>
            <FormItem label="City">
              <Input
                value={this.state.city}
                onChange={e => this.setState({city: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <div style={{height: 90}} />
          </Col>
          <Col xs={12}>
            <FormItem label="Address">
              <Input
                value={this.state.street}
                onChange={e => this.setState({street: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <div style={{height: 90}} />
          </Col>
          <Col xs={6}>
            <FormItem label="State">
              <Input
                value={this.state.state}
                onChange={e => this.setState({state: e.target.value})}
              />
            </FormItem>
          </Col>{' '}
          <Col xs={6}>
            <FormItem label="Zip">
              <Input
                value={this.state.zip}
                onChange={e => this.setState({zip: e.target.value})}
              />
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          {this.props.onCancel && (
            <Button
              style={{width: 100, marginRight: 16}}
              grey
              onClick={this.props.onCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            disabled={this.props.loading}
            style={{width: 140}}
            onClick={this.onSubmit}
          >
            {!this.props.loading ? this.props.buttonText : '...'}
          </Button>{' '}
        </FormItem>
      </Container>
    );
  }
}

EmployeeForm.defaultProps = {
  buttonText: 'Save Changes',
};

export default EmployeeForm;
