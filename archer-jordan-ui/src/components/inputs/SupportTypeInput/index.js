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

          <Option value="software">Software: How to use it</Option>
          <Option value="benefits">Benefits: How to access them</Option>
          <Option value="data">Data: My monthly reports</Option>
          <Option value="account">Account: Update my info</Option>
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
