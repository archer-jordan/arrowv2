// TOP LEVEL IMPORTS
import React from 'react';
import {Route} from 'react-router-dom';

// EXPORTED COMPONENT
// ==============================
const PublicRoute = props => {
  const {
    currentUser,
    showHeader,
    showFooter,
    component: Component,
    path,
    backgroundColor,
    layout: Layout,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      path={path}
      render={args => (
        <Layout
          currentUser={currentUser}
          backgroundColor={backgroundColor}
          showHeader={showHeader}
          showFooter={showFooter}
        >
          <Component currentUser={currentUser} {...args} />
        </Layout>
      )}
    />
  );
};

// PROPS
// ==============================
PublicRoute.defaultProps = {
  redirectOnAuth: true,
};

// EXPORT
// ==============================
export default PublicRoute;
