import styled from 'styled-components';

const BigValue = styled.div`
  font-size: 48px;
  color: ${(p) => p.theme.colors.primary2};
  min-height: 48px;
  line-height: 48px;
  @media only screen and (max-width: 1200px) {
    font-size: 32px;
    line-height: 32px;
  }
`;

export default BigValue;
