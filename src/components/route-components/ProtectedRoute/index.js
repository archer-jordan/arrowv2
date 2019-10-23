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

    // if user is a mentor and they are not already on a mentor page, redirect them

    if (
      currentUser &&
      currentUser.roles &&
      currentUser.roles.includes('superAdmin')
    ) {
      return <Redirect to="/admin" />;
    }

    return (
      <Route
        {...rest}
        path={path}
        render={args => (
          <div style={{height: '100%'}}>
            {currentUser && currentUser.id ? (
              <Layout {...args} {...this.props}>
                <Component {...args} {...this.props} />
              </Layout>
            ) : (
              <Redirect to="/" />
            )}
          </div>
        )}
      />
    );
  }
}

export default ProtectedRoute;
