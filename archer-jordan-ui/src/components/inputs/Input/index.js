import styled from 'styled-components';

export default styled.input`
  background: ${(p) => p.theme.colors.tan};
  width: 100%;
  height: 50px;
  padding-left: 8px;
  border-radius: 5px;
  border: 2px solid ${(p) => p.theme.colors.tan};
  &:focus {
    outline: 0;
    background: #fff;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
