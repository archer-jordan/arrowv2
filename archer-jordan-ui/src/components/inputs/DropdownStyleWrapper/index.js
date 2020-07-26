import styled from 'styled-components';

export default styled.div`
  width: 100%;
  .ant-select-selection {
    height: 50px;
    background: #eae8e3;
    border: 1px solid #eae8e3;
  }
  .ant-select-selection__rendered {
    height: 46px;
    align-items: center;
    display: flex;
    background: #eae8e3;
  }
  .ant-select-selection:focus,
  .ant-select-selection:active {
    border-color: #eae8e3 !important;
  }
`;
