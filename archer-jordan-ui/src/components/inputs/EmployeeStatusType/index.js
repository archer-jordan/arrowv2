import React from 'react';
import Select from '../SelectInput';
import DropdownStyleWrapper from '../DropdownStyleWrapper';

const {Option} = Select;

class EmployeeStatusType extends React.PureComponent {
  render() {
    return (
      <DropdownStyleWrapper>
        <Select
          value={this.props.value}
          style={{width: '100%'}}
          onChange={this.props.onChange}
        >
          <Option value="Terminated">Terminated</Option>
          <Option value="Active">Active</Option>
        </Select>
      </DropdownStyleWrapper>
    );
  }
}

export default EmployeeStatusType;
