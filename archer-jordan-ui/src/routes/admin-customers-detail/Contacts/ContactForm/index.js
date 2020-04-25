import React from 'react';
import {validate} from 'email-validator';
import Input from 'components/inputs/Input';
import FormItem from 'components/common/FormItem';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';
import ErrorBlock from 'components/common/ErrorBlock';

class ContactForm extends React.PureComponent {
  state = {
    id: this.props.contact && this.props.contact.id,
    email: this.props.contact && this.props.contact.email,
    firstName: this.props.contact && this.props.contact.firstName,
    lastName: this.props.contact && this.props.contact.lastName,
    title: this.props.contact && this.props.contact.title,
    phone: this.props.contact && this.props.contact.phone,
    errors: [],
  };
  onSave = () => {
    this.setState({errors: []});
    if (!this.state.email) {
      return this.setState({errors: ['Please provide an email']});
    }
    if (!validate(this.state.email)) {
      return this.setState({errors: ['Please provide a valid email']});
    }
    if (!this.state.firstName) {
      return this.setState({errors: ['Please provide a first name']});
    }
    if (!this.state.lastName) {
      return this.setState({errors: ['Please provide a last name']});
    }

    this.props.onSaveContact({
      id: this.state.id,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      title: this.state.title,
      phone: this.state.phone,
    });
  };
  render() {
    return (
      <Row
        style={{
          width: 650,
          marginBottom: 16,
          padding: 16,
          maxWidth: '100%',
        }}
        gutter={16}
      >
        {' '}
        {/*<Col xs={12} />{' '}
        <Col xs={12}>
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => this.props.onRemove(this.state.id)}
            okText="Yes"
          >
            <RemoveBtn>
              <Icon type="delete" style={{marginRight: 4}} />
              Remove
            </RemoveBtn>
          </Popconfirm>
        </Col> */}
        <Col xs={12}>
          <FormItem label="First Name">
            <Input
              value={this.state.firstName}
              onChange={(e) => this.setState({firstName: e.target.value})}
            />
          </FormItem>
        </Col>{' '}
        <Col xs={12}>
          <FormItem label="Last Name">
            <Input
              value={this.state.lastName}
              onChange={(e) => this.setState({lastName: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={12}>
          <FormItem label="Role or Title">
            <Input
              value={this.state.title}
              onChange={(e) => this.setState({title: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={12}>
          <FormItem label="Email Address">
            <Input
              value={this.state.email}
              onChange={(e) => this.setState({email: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={12}>
          <FormItem label="Phone">
            <Input
              value={this.state.phone}
              onChange={(e) => this.setState({phone: e.target.value})}
            />
          </FormItem>
        </Col>
        <Col xs={24}>
          {this.state.errors && this.state.errors.length > 0 && (
            <FormItem>
              <ErrorBlock errors={this.state.errors} />
            </FormItem>
          )}
        </Col>
        <Col xs={12} />
        <Col xs={24}>
          <FormItem>
            <Button
              grey
              style={{width: 100, marginRight: 16}}
              onClick={this.props.onCancel}
            >
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

export default ContactForm;
