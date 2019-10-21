// TOP LEVEL IMPORTS
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PublicRoute from 'components/route-components/PublicRoute'; // will redirect them to home screen if signed in
// LAYOUTS
import PublicLayout from 'components/layout/PublicLayout';
import AppLayout from 'components/layout/AppLayout';
// public
import PageNotFound from 'routes/public-not-found';
// AUTH
import AuthLoginRoute from 'routes/auth-login';
import AuthForgotPassword from 'routes/auth-forgot-password';
import ResetPassword from 'routes/auth-reset-password';
// APP
import AppReportsRoute from 'routes/app-reports';
import AppUsersRoute from 'routes/app-users';
import AppEmployeesRoute from 'routes/app-employees';
import AppAccountRoute from 'routes/app-account';
import AppSupportRoute from 'routes/app-support';
import AppEmployeesDetailRoute from 'routes/app-employees-detail';

// EXPORTED COMPONENT
// ========================================
class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        {' '}
        <Switch>
          <PublicRoute
            exact
            layout={AppLayout}
            path="/reports"
            component={AppReportsRoute}
          />
          <PublicRoute
            exact
            layout={AppLayout}
            path="/users"
            component={AppUsersRoute}
          />
          <PublicRoute
            exact
            layout={AppLayout}
            path="/employees"
            component={AppEmployeesRoute}
          />
          <PublicRoute
            exact
            layout={AppLayout}
            path="/employees/:id"
            component={AppEmployeesDetailRoute}
          />
          <PublicRoute
            exact
            layout={AppLayout}
            path="/account"
            component={AppAccountRoute}
          />
          <PublicRoute
            exact
            layout={AppLayout}
            path="/support"
            component={AppSupportRoute}
          />

          <PublicRoute
            exact
            layout={PublicLayout}
            path="/login"
            component={AuthLoginRoute}
          />
          <PublicRoute
            exact
            layout={PublicLayout}
            path="/forgot-password"
            component={AuthForgotPassword}
          />
          <PublicRoute
            exact
            layout={PublicLayout}
            path="/reset-password/:token"
            component={ResetPassword}
          />
          <PublicRoute
            exact
            layout={PublicLayout}
            path="/"
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

// EXPORT
// ==============================
export default AppRoutes;
