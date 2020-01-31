import React from 'react';
import Select from '../SelectInput';
import DropdownStyleWrapper from '../DropdownStyleWrapper';

const {Option} = Select;

class CustomerStatusInput extends React.PureComponent {
  render() {
    return (
      <DropdownStyleWrapper>
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
      </DropdownStyleWrapper>
    );
  }
}

export default CustomerStatusInput;
