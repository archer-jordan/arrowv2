// TOP LEVEL IMPORTS
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PublicRoute from 'components/route-components/PublicRoute';
import AdminRoute from 'components/route-components/AdminRoute';
import ProtectedRoute from 'components/route-components/ProtectedRoute'; // will redirect them to home screen if signed in
// LAYOUTS
import PublicLayout from 'components/layout/PublicLayout';
import AppLayout from 'components/layout/AppLayout';
import AdminLayout from 'components/layout/AdminLayout';
// COMPONENTS
import Loading from 'components/common/Loading';
// public
import PageNotFound from 'routes/public-not-found';
// AUTH
import AuthLoginRoute from 'routes/auth-login';
import AuthForgotPassword from 'routes/auth-forgot-password';
import ResetPassword from 'routes/auth-reset-password';
// APOLLO
import {graphql} from 'react-apollo';

import currentUserQuery from 'ApolloClient/Queries/currentUser';
// APP
import AppReportsRoute from 'routes/app-reports';
import AppUsersRoute from 'routes/app-users';
import AppEmployeesRoute from 'routes/app-employees';
import AppAccountRoute from 'routes/app-account';
import AppSupportRoute from 'routes/app-support';
import AdminHome from 'routes/admin-home';
import AppEmployeesDetailRoute from 'routes/app-employees-detail';
const compose = require('lodash/flowRight');

// EXPORTED COMPONENT
// ========================================
class AppRoutes extends React.Component {
  render() {
    const {currentUserQuery} = this.props;
    const {loading, error, currentUser} = currentUserQuery;
    let errorExists = error && error.message;

    if (loading) {
      return <Loading />;
    }

    // show specific message for certain network/timeout errors
    if (
      errorExists &&
      (error.message.includes('Timeout exceeded') ||
        error.message.includes('ConnectionTimeout'))
    ) {
      return <div>Connection Issues</div>;
    }

    // all other errors (that are not in our white listed errors list) just print to screen for now, unless it's a white listed error
    if (errorExists) {
      return <div />;
    }
    return (
      <Router>
        {' '}
        <Switch>
          <ProtectedRoute
            exact
            layout={AppLayout}
            path="/reports"
            currentUser={currentUser}
            component={AppReportsRoute}
          />
          <ProtectedRoute
            exact
            layout={AppLayout}
            path="/users"
            currentUser={currentUser}
            component={AppUsersRoute}
          />
          <ProtectedRoute
            exact
            layout={AppLayout}
            path="/employees"
            currentUser={currentUser}
            component={AppEmployeesRoute}
          />
          <ProtectedRoute
            exact
            layout={AppLayout}
            path="/employees/:id"
            currentUser={currentUser}
            component={AppEmployeesDetailRoute}
          />
          <ProtectedRoute
            exact
            layout={AppLayout}
            path="/account"
            currentUser={currentUser}
            component={AppAccountRoute}
          />
          <ProtectedRoute
            exact
            layout={AppLayout}
            path="/support"
            currentUser={currentUser}
            component={AppSupportRoute}
          />
          <AdminRoute
            exact
            layout={AdminLayout}
            path="/admin"
            currentUser={currentUser}
            component={AdminHome}
          />
          <PublicRoute
            exact
            layout={PublicLayout}
            path="/login"
            currentUser={currentUser}
            component={AuthLoginRoute}
          />
          <PublicRoute
            exact
            layout={PublicLayout}
            path="/forgot-password"
            currentUser={currentUser}
            component={AuthForgotPassword}
          />
          <PublicRoute
            exact
            layout={PublicLayout}
            path="/reset-password/:token"
            currentUser={currentUser}
            component={ResetPassword}
          />
          <PublicRoute
            exact
            layout={PublicLayout}
            path="/"
            currentUser={currentUser}
            component={AuthLoginRoute}
          />
          <Route
            render={() => (
              <PublicLayout showFooter={false} showHeader={false}>
                <PageNotFound />
              </PublicLayout>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

// APOLLO
// ==============================
let options = () => ({
  errorPolicy: 'all',
  pollInterval: 200000, // rerun currentUser every X milliseconds
});

// EXPORT
// ==============================
export default compose(
  graphql(currentUserQuery, {options, name: 'currentUserQuery'})
)(AppRoutes);
