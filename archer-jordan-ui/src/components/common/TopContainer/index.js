import styled from 'styled-components';

const TopContainer = styled.div`
  width: 100%;
  background: ${(p) => p.theme.colors.tan};
  max-width: 100%;
  border-radius: 15px;
  padding: 24px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 414px) {
    height: 245px;
  }
`;

export default TopContainer;
