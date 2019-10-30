import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';

const {Option} = Select;

const Container = styled.div`
  padding: 16px;
  padding-top: 24px;
  min-height: 200px;
  width: 500px;
  max-width: 100%;
  border: 1px solid ${p => p.theme.colors.neutral9};
  border-radius: 5px;
`;

class CustomerForm extends React.PureComponent {
  state = {
    title: this.props.title || null,
  };
  onSubmit = () => {
    this.props.onSubmit({
      title: this.state.title,
    });
  };
  render() {
    return (
      <Container>
        <TextInput
          dark
          label="title"
          value={this.state.title}
          onChange={e => this.setState({title: e.target.value})}
        />
        <TextInput
          dark
          label="ein"
          value={this.state.ein}
          onChange={e => this.setState({ein: e.target.value})}
        />
        <Select>
          <Option value="option">Option</Option>
        </Select>
        <Button style={{width: 100}} grey onClick={this.props.onCancel}>
          Cancel
        </Button>
        <Button
          disabled={this.props.loading}
          style={{width: 100}}
          onClick={this.onSubmit}
        >
          {!this.props.loading ? 'Submit' : '...'}
        </Button>
      </Container>
    );
  }
}

export default CustomerForm;
