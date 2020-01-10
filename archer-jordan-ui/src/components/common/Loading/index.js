// TOP LEVEL IMPORTS
import React from 'react';
import Icon from 'components/common/Icon';
import theme from 'lib/theme';

export default () => (
  <div
    style={{
      height: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Icon
      type="loading"
      style={{ fontSize: 25, color: theme.colors.primary5 }}
    />
  </div>
);
