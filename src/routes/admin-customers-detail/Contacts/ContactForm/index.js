import React from 'react';
import styled from 'styled-components';
import Input from 'components/inputs/Input';
import FormItem from 'components/common/FormItem';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Icon from 'components/common/Icon';
import Popconfirm from 'components/common/Popconfirm';
import Button from 'components/common/Button';

const RemoveBtn = styled.div`
  text-align: right;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #666;
  }
`;

class ContactForm extends React.PureComponent {
  state = {
    id: this.props.contact.id || '',
    email: this.props.contact.email || '',
    firstName: this.props.contact.firstName || '',
    lastName: this.props.contact.lastName || '',
    title: this.props.contact.title || '',
    phone: this.props.contact.phone || '',
  };
  onSave = () => {
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
          border: '1px solid #efefef',
        }}
        gutter={16}
      >
        {' '}
        <Col xs={12} />{' '}
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
        </Col>
        <Col xs={12}>
          <FormItem label="First Name">
            <Input
              value={this.state.firstName}
              onChange={e => this.setState({firstName: e.target.value})}
            />
          </FormItem>
        </Col>{' '}
        <Col xs={12}>
          <FormItem label="Last Name">
            <Input
              value={this.state.lastName}
              onChange={e => this.setState({lastName: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={12}>
          <FormItem label="Role or Title">
            <Input
              value={this.state.title}
              onChange={e => this.setState({title: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={12}>
          <FormItem label="Email Address">
            <Input
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
            />
          </FormItem>{' '}
        </Col>{' '}
        <Col xs={12}>
          <FormItem label="Phone">
            <Input
              value={this.state.phone}
              onChange={e => this.setState({phone: e.target.value})}
            />
          </FormItem>
        </Col>
        <Col xs={24}>{/* <FormItem /> */}</Col>
        <Col xs={12} />
        <Col xs={24}>
          <FormItem>
            <Button secondary style={{width: 140}} onClick={this.onSave}>
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
