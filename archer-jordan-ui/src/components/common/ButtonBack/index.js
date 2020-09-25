import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';

const Button = styled.button`
  border: 0px;
  background: transparent;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

export default ({onClick = () => {}, label = 'Go Back'}) => {
  return (
    <Button onClick={onClick}>
      <Icon type="arrow-left" style={{marginRight: 4}} />
      {label}
    </Button>
  );
};
