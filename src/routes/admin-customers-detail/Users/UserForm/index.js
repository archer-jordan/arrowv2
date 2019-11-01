import React from 'react';
import Input from 'components/inputs/Input';
import FormItem from 'components/common/FormItem';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';

class UserForm extends React.PureComponent {
  state = {};
  onSave = () => {
    this.props.onSubmit({
      id: this.state.id,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  };
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
          <FormItem label="Email Address">
            <Input
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={24}>
          <FormItem>
            <Button grey style={{width: 90}} onClick={this.props.onCancel}>
              Cancel
            </Button>
            <Button style={{width: 140}} onClick={this.onSave}>
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
