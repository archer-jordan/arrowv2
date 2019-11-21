import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';

const ErrorBlockContainer = styled.div`
  background: ${p => p.theme.colors.red10};
  border-left: 4px solid ${p => p.theme.colors.red4};
  padding: 8px;
  border-radius: 5px;
  color: ${p => p.theme.colors.red2};
  font-size: 13px;
  margin-bottom: 16px;
  display: flex;
`;

const ErrorBlock = ({errors = [], error}) => (
  <ErrorBlockContainer>
    <Icon type="close-circle" style={{marginRight: 4, fontSize: 18}} />
    {errors && errors.map(item => item)}
    {error}
  </ErrorBlockContainer>
);

export default ErrorBlock;
