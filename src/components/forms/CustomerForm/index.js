import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import FormItem from 'components/common/FormItem';
import Input from 'components/inputs/Input';
import Button from 'components/common/Button';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';

const {Option} = Select;

const Container = styled.div`
  min-height: 200px;
  width: 700px;
  max-width: 100%;
  border-radius: 5px;
`;

class CustomerForm extends React.PureComponent {
  state = {
    title: this.props.title || null,
    companyType: this.props.companyType || null,
    ein: this.props.ein || null,
    naics: this.props.naics || null,
    sic: this.props.sic || null,
    street: this.props.street || null,
    zip: this.props.zip || null,
    city: this.props.city || null,
    state: this.props.state || null,
  };
  onSubmit = () => {
    this.props.onSubmit({
      title: this.state.title,
      companyType: this.state.companyType,
      ein: this.state.ein,
      naics: this.state.naics,
      sic: this.state.sic,
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
            <FormItem label="Company Name">
              <Input
                value={this.state.title}
                onChange={e => this.setState({title: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="Company Type">
              <Input
                value={this.state.companyType}
                onChange={e => this.setState({companyType: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="Company Address">
              <Input
                value={this.state.street}
                onChange={e => this.setState({street: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="EIN">
              <Input
                value={this.state.ein}
                onChange={e => this.setState({ein: e.target.value})}
              />
            </FormItem>
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
            <FormItem label="NAICS">
              <Input
                value={this.state.naics}
                onChange={e => this.setState({naics: e.target.value})}
              />
            </FormItem>
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
          <Col xs={12}>
            <FormItem label="SIC">
              <Input
                value={this.state.sic}
                onChange={e => this.setState({sic: e.target.value})}
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

CustomerForm.defaultProps = {
  buttonText: 'Save Changes',
};

export default CustomerForm;
