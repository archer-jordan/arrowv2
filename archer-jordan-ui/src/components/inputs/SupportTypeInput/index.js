import React from 'react';
import Select from '../SelectInput';
import DropdownStyleWrapper from '../DropdownStyleWrapper';

const {Option} = Select;

class SupportTypeInput extends React.PureComponent {
  render() {
    return (
      <DropdownStyleWrapper>
        <Select
          value={this.props.value}
          style={{width: '100%'}}
          onChange={this.props.onChange}
        >
          {this.props.showAllOption && (
            <Option value={null}>All Support Types</Option>
          )}

          <Option value="software">Using the software</Option>
          <Option value="benefits">Accessing my benefits</Option>
          <Option value="data">My monthly reports</Option>
          <Option value="account">My account</Option>
          <Option value="other">Other</Option>
        </Select>
      </DropdownStyleWrapper>
    );
  }
}
// 'software', 'benefits', 'data', 'account';

SupportTypeInput.defaultProps = {
  showAllOption: true,
};
export default SupportTypeInput;
