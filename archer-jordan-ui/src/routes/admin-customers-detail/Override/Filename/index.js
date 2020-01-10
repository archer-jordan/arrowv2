import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';

const Filename = ({name, onClick}) => (
  <span style={{position: 'relative'}}>
    <Icon
      type="close-circle"
      theme="filled"
      style={{
        position: 'absolute',
        left: -28,
        bottom: 0,
        color: '#999',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
    {name}
  </span>
);

export default Filename;
