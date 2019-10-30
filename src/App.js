// TOP LEVEL IMPORTS
import React from 'react';
import theme, {GlobalStyle} from 'lib/theme';
import {ThemeProvider} from 'styled-components';
import AppRoutes from './routes/index';
import {ApolloProvider} from 'react-apollo';
// APOLLO
import client from 'ApolloClient';

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <AppRoutes />
      </React.Fragment>
    </ThemeProvider>
  </ApolloProvider>
);
