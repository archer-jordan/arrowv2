import styled from 'styled-components';

export default styled.input`
  background: ${p => p.theme.colors.neutral10};
  border: 0px;
  width: 100%;
  height: 50px;
  padding-left: 8px;
  border-radius: 5px;
  &:focus {
    outline: 0;
  }
`;
