// TOP LEVEL IMPORTS
import React from 'react';
import styled from 'styled-components';
import compose from 'lodash/flowRight';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// PUBLIC
import PublicRoute from 'components/route-components/PublicRoute';
import AdminRoute from 'components/route-components/AdminRoute';
import ProtectedRoute from 'components/route-components/ProtectedRoute'; // will redirect them to home screen if signed in
import PageNotFound from 'routes/public-not-found';
// LAYOUTS
import PublicLayout from 'components/layout/PublicLayout';
import AppLayout from 'components/layout/AppLayout';
import AdminLayout from 'components/layout/AdminLayout';
// COMPONENTS
import Loading from 'components/common/Loading';
// AUTH
import AuthLoginRoute from 'routes/auth-login';
import AuthForgotPassword from 'routes/auth-forgot-password';
import ResetPassword from 'routes/auth-reset-password';
import AuthRegister from 'routes/auth-register';
import AuthRegisterAccount from 'routes/auth-register-account';
// APOLLO
import {graphql} from 'react-apollo';
import currentUserQuery from 'ApolloClient/Queries/currentUser';
// APP
import AppReportsRoute from 'routes/app-reports';
import AppUsersRoute from 'routes/app-users';
import AppEmployeesRoute from 'routes/app-employees';
import AppAccountRoute from 'routes/app-account';
import AppSupportRoute from 'routes/app-support';
import AppEmployeeDashboardRoute from 'routes/app-employee-dashboard';
import AppEmployeesDetailRoute from 'routes/app-employees-detail';
// ADMIN
import AdminCustomers from 'routes/admin-customers';
import AdminDocs from 'routes/admin-docs';
import AdminVendors from 'routes/admin-vendors';
import AdminUsers from 'routes/admin-users';
import AdminSupport from 'routes/admin-support';
import AdminCustomerDetail from 'routes/admin-customers-detail';
// LIB
import logoWhite from 'lib/media/arrow-logo-white.png';

const Background = styled.div`
  background-image: linear-gradient(to top, #145d91, #0e3456);
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  color: #8cb3cd;
  font-size: 16px;
  margin-top: 16px;
`;

// EXPORTED COMPONENT
// ========================================
class AppRoutes extends React.Component {
  componentWillMount() {
    // initialize Sentry if we have a DSN key in our environment variables
    if (process.env.REACT_APP_SENTRY_DSN) {
      window.Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
      });
    }
  }
  render() {
    const {currentUserQuery} = this.props;
    const {loading, error, currentUser} = currentUserQuery;
    let errorExists = error && error.message;

    if (loading) {
      return <Loading />;
    }

    // all other errors (that are not in our white listed errors list) just print to screen for now, unless it's a white listed error
    if (errorExists) {
      return (
        <div>
          Something went wrong... If this continues please contact support.
        </div>
      );
    }

    // if user is not a super admin and their company status is not active, show a message
    if (
      currentUser &&
      !currentUser.roles.includes('superAdmin') &&
      currentUser.companyStatus !== 'active'
    ) {
      return (
        <Background>
          {' '}
          <div style={{marginTop: '15%'}}>
            <img height="60" src={logoWhite} alt="arrow-logo" />
            <Text>This account has not been activated</Text>
          </div>
        </Background>
      );
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
            path="/dashboard"
            currentUser={currentUser}
            component={AppEmployeeDashboardRoute}
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
          <PublicRoute
            exact
            layout={PublicLayout}
            path="/register"
            currentUser={currentUser}
            component={AuthRegister}
          />
          <PublicRoute
            exact
            layout={PublicLayout}
            path="/register-account/:token"
            currentUser={currentUser}
            component={AuthRegisterAccount}
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
            component={AdminCustomers}
          />
          <AdminRoute
            exact
            layout={AdminLayout}
            path="/admin/users"
            currentUser={currentUser}
            component={AdminUsers}
          />
          <AdminRoute
            exact
            layout={AdminLayout}
            path="/admin/support"
            currentUser={currentUser}
            component={AdminSupport}
          />
          <AdminRoute
            exact
            layout={AdminLayout}
            path="/admin/vendors"
            currentUser={currentUser}
            component={AdminVendors}
          />
          <AdminRoute
            exact
            layout={AdminLayout}
            path="/admin/customers"
            currentUser={currentUser}
            component={AdminCustomers}
          />
          <AdminRoute
            exact
            layout={AdminLayout}
            path="/admin/docs"
            currentUser={currentUser}
            component={AdminDocs}
          />

          <AdminRoute
            exact
            layout={AdminLayout}
            path="/admin/customers/:id"
            currentUser={currentUser}
            component={AdminCustomerDetail}
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
