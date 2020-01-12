import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/css';
import styled from 'styled-components';

const Wrapper = styled.div`
  .ant-calendar-picker-input {
    height: 50px;
    background: ${p => p.theme.colors.neutral10} !important;
    border: 0px;
  }
`;

export default props => {
  return (
    <Wrapper>
      <DatePicker {...props} />
    </Wrapper>
  );
};