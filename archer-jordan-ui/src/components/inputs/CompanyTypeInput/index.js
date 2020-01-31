import React from 'react';
import Select from '../SelectInput';
import DropdownStyleWrapper from '../DropdownStyleWrapper';

const {Option} = Select;

class CompanyTypeInpput extends React.PureComponent {
  render() {
    return (
      <DropdownStyleWrapper>
        <Select
          value={this.props.value}
          style={{width: '100%'}}
          onChange={this.props.onChange}
        >
          <Option value="llc">LLC</Option>
          <Option value="llp">LLP</Option>
          <Option value="cCorp">C-Corp</Option>
          <Option value="sCorp">S-Corp</Option>
          <Option value="other">Other</Option>
        </Select>
      </DropdownStyleWrapper>
    );
  }
}

export default CompanyTypeInpput;
