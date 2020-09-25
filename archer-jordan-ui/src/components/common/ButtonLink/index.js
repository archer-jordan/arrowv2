import styled from 'styled-components';

export default styled.button`
  color: ${(p) => p.theme.colors.support1};
  cursor: pointer;
  border: 0px;
  background: transparent;
  text-decoration: underline;
  &:focus {
    outline: 0;
  }
`;
