import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import FormItem from 'components/common/FormItem';
import Input from 'components/inputs/Input';
import Button from 'components/common/Button';
import Row from 'components/common/Row';
import Col from 'components/common/Col';

const Container = styled.div`
  min-height: 200px;
  width: 700px;
  max-width: 100%;
  border-radius: 5px;
`;

class EmployeeForm extends React.PureComponent {
  state = {
    lastName: this.props.lastName || null,
    firstName: this.props.firstName || null,
    assignedId: this.props.assignedId || null,
    status: this.props.status || null,
    email: this.props.email || null,
    dob: this.props.dob || null,
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
    this.props.onSubmit({
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      assignedId: this.state.assignedId,
      email: this.state.email,
      status: this.state.status,
      // location
      street: this.state.street,
      zip: this.state.zip,
      city: this.state.city,
      state: this.state.state,
    });
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
              <Input
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})}
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
              <Input
                value={this.state.status}
                onChange={e => this.setState({status: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="DOB">
              <Input
                value={this.state.dob}
                onChange={e => this.setState({dob: e.target.value})}
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
            <Button style={{width: 100}} grey onClick={this.props.onCancel}>
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
