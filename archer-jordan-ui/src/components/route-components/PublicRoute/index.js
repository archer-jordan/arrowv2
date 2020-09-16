// TOP LEVEL IMPORTS
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// EXPORTED COMPONENT
// ==============================
const PublicRoute = (props) => {
  const {
    currentUser,
    redirectOnAuth,
    showHeader,
    showFooter,
    component: Component,
    path,
    backgroundColor,
    layout: Layout,
    ...rest
  } = props;

  if (
    currentUser &&
    currentUser.roles &&
    currentUser.roles.includes('referral') &&
    redirectOnAuth
  ) {
    return <Redirect to="/referral" />;
  }

  if (currentUser && currentUser.id && redirectOnAuth) {
    return <Redirect to="/reports" />;
  }

  return (
    <Route
      {...rest}
      path={path}
      render={(args) => (
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
