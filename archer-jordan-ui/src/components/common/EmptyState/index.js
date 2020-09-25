import React from 'react';
import styled from 'styled-components';
import empty from './empty.svg';

const Container = styled.div`
  margin-top: 48px;
  width: 425px;
  max-width: 100%;
  text-align: center;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 8px;
  color: ${(p) => p.theme.colors.neutral1};
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.neutral5};
`;

export default ({title, subtitle}) => {
  return (
    <Container>
      <div>
        <img src={empty} alt="empty-state" height="100" />
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </div>
    </Container>
  );
};
