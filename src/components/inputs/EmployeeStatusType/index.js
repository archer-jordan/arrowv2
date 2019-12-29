import React from 'react';
import Select from '../SelectInput';
import styled from 'styled-components';

const {Option} = Select;

const Wrapper = styled.div`
  .ant-select-selection {
    height: 50px;
    background: #f5f7fa;
    border: 1px solid #f5f7fa;
  }
  .ant-select-selection__rendered {
    height: 46px;
    align-items: center;
    display: flex;
    background: #f5f7fa;
  }
  .ant-select-selection:focus,
  .ant-select-selection:active {
    border-color: #f5f7fa !important;
  }
`;

class EmployeeStatusType extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Select
          value={this.props.value}
          style={{width: '100%'}}
          onChange={this.props.onChange}
        >
          <Option value="Terminated">Terminated</Option>
          <Option value="Active">Active</Option>
        </Select>
      </Wrapper>
    );
  }
}

export default EmployeeStatusType;
