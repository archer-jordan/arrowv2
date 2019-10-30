// TOP LEVEL IMPORTS
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

class ProtectedRoute extends React.Component {
  render() {
    const {
      currentUser,
      path,
      noNav,
      noFooter,
      theme,
      location,
      isAllowed,
      component: Component,
      layout: Layout,
      ...rest
    } = this.props;

    if (
      currentUser &&
      currentUser.roles &&
      !currentUser.roles.includes('superAdmin')
    ) {
      return <Redirect to="/" />;
    }

    return (
      <Route
        {...rest}
        path={path}
        render={args => (
          <React.Fragment>
            {currentUser && currentUser.id ? (
              <Layout {...args} {...this.props}>
                <Component {...args} {...this.props} />
              </Layout>
            ) : (
              <Redirect to="/" />
            )}
          </React.Fragment>
        )}
      />
    );
  }
}

export default ProtectedRoute;
