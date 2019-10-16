// TOP LEVEL IMPORTS
import React from 'react';
import theme, {GlobalStyle} from 'lib/theme';
import {ThemeProvider} from 'styled-components';
import AppRoutes from './routes/index';

export default () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      <AppRoutes />
    </React.Fragment>
  </ThemeProvider>
);
