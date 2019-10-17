// TOP LEVEL IMPORTS
import React from 'react';
import theme, {GlobalStyle} from 'lib/theme';
import {ThemeProvider} from 'styled-components';
import AppRoutes from './routes/index';
import {Auth0Provider} from 'auth';

const onRedirectCallback = appState => {
  console.log(appState);
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

export default () => (
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <AppRoutes />
      </React.Fragment>
    </ThemeProvider>
  </Auth0Provider>
);
