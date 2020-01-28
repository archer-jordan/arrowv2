import React from 'react';
import Select from '../SelectInput';
import styled from 'styled-components';

const {Option} = Select;

const Wrapper = styled.div`
  .ant-select-selection__rendered,
  .ant-select-selection,
  .ant-select-selection--single {
    background: #ebf2f7 !important;
    border: 0px !important;
    height: 50px;
  }
  .ant-select-selection-selected-value {
    height: 50px;
    display: flex !important;
    align-items: center !important;
  }
`;

class SupportTypeInput extends React.PureComponent {
  render() {
    return (
      <Wrapper>
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
      </Wrapper>
    );
  }
}
// 'software', 'benefits', 'data', 'account';

SupportTypeInput.defaultProps = {
  showAllOption: true,
};
export default SupportTypeInput;
