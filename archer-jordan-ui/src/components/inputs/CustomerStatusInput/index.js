import React from 'react';
import Select from '../SelectInput';

const {Option} = Select;

class CustomerStatusInput extends React.PureComponent {
  render() {
    return (
      <Select
        value={this.props.value}
        style={{width: '100%'}}
        onChange={this.props.onChange}
      >
        <Option value="pending">Pending</Option>
        <Option value="active">Active</Option>
        <Option value="disabled">Disabled</Option>
        <Option value="archived">Archived</Option>
      </Select>
    );
  }
}

export default CustomerStatusInput;
