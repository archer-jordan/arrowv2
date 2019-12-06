import React from 'react';
import queryString from 'query-string';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Loading from 'components/common/Loading';
import Breadcrumb from 'components/common/Breadcrumb';
import MonthComponent from 'components/common/MonthComponent';
import HealthAndWelfare from './HealthAndWelfare';
import Eligibility from './Eligibility';
import Retirement from './Retirement';
import Benefits from './Benefits';
import Downloads from './Downloads';
import SideNav from 'components/common/SideNav';
import EmployeeDashboard from './EmployeeDashboard';
// APOLLO
import {Query} from 'react-apollo';
import customerReport from 'ApolloClient/Queries/customerReport';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

class AppReports extends React.PureComponent {
  state = {};
  onParamChange = newValues => {
    let oldParams = queryString.parse(this.props.location.search);
    let newParams = {
      ...oldParams,
      ...newValues,
    };
    let newString = queryString.stringify(newParams);
    this.props.history.push(`?${newString}`);
  };
  checkParams = () => {
    let oldParams = queryString.parse(this.props.location.search);
    if (!oldParams.tab && oldParams.tab !== 'null') {
      let month = moment()
        .format('MMMM')
        .toLowerCase();
      let year = moment()
        .format('YYYY')
        .toLowerCase();
      return this.onParamChange({month, year, tab: 'health'});
    }
    if (
      (!oldParams.year && oldParams.year !== 'null') ||
      (!oldParams.month && oldParams.month !== 'null')
    ) {
      let month = moment()
        .format('MMMM')
        .toLowerCase();
      let year = moment()
        .format('YYYY')
        .toLowerCase();
      return this.onParamChange({month, year});
    }
  };
  componentWillMount() {
    this.checkParams();
  }
  getTab = tab => {
    switch (tab) {
      case 'health':
        return 'Health & Welfare';
      case 'eligibility':
        return 'Eligibility';
      case 'benefits':
        return 'Benefits';
      case 'retirement':
        return 'Retirement';
      case 'download':
        return 'Download XL';
      default:
        return null;
    }
  };
  getNavItems = () => {
    // an array of data that will build our sidenav items
    let navItems = [
      {
        label: 'Health & Welfare',
        activeValue: 'health',
        onClick: () =>
          this.onParamChange({
            tab: 'health',
          }),
      },
      {
        label: 'Eligibility',
        activeValue: 'eligibility',
        onClick: () =>
          this.onParamChange({
            tab: 'eligibility',
          }),
      },
      {
        label: 'Benefits',
        activeValue: 'benefits',
        onClick: () =>
          this.onParamChange({
            tab: 'benefits',
          }),
      },
      {
        label: 'Retirement',
        activeValue: 'retirement',
        onClick: () =>
          this.onParamChange({
            tab: 'retirement',
          }),
      },
      {
        label: 'Downloads',
        activeValue: 'download',
        onClick: () =>
          this.onParamChange({
            tab: 'download',
          }),
      },
    ];

    // if the query does not have retirement data, then we don't want to show the retirement tab
    if (
      this.state.queryData &&
      this.state.queryData.customerReport &&
      !this.state.queryData.customerReport.labelForTotalRetirement &&
      !this.state.queryData.customerReport.totalRetirement
    ) {
      navItems = navItems.filter(item => item.activeValue !== 'retirement');
    }

    // return the nav options
    return navItems;
  };
  render() {
    const {location, history} = this.props;

    // If user is a company admin but does not have persmission to view company data, we will re-route them
    if (
      this.props.currentUser.roles.includes('coAdmin') &&
      !this.props.currentUser.permissions.includes('viewCompanyData')
    ) {
      return <Redirect to="/account?tab=profile" />;
    }

    if (
      this.props.currentUser &&
      this.props.currentUser.roles.includes('coEmployee')
    ) {
      return (
        <EmployeeDashboard
          employeeId={this.props.currentUser.employeeId}
          {...this.props}
        />
      );
    }

    const {tab, month, year} = queryString.parse(location.search);

    return (
      <div style={{padding: 8}}>
        <Breadcrumb crumbs={['Reports', this.getTab(tab)]} />
        <Row>
          <Col xs={24} md={16} />
          <Col xs={24}>
            {' '}
            <MonthComponent
              year={year}
              month={month}
              onChange={this.onParamChange}
            />
          </Col>
          <Col xs={24} md={6}>
            <SideNav items={this.getNavItems()} tab={tab} />
          </Col>

          <Col xs={24} md={18}>
            {this.props.currentUser.customerId && year && month && (
              <Query
                query={customerReport}
                variables={{
                  customerId: this.props.currentUser.customerId,
                  month: moment(helpers.capitalize(month), 'MMMM').format('M'),
                  year: year,
                }}
                onCompleted={queryData => this.setState({queryData})}
              >
                {({loading, data, error}) => {
                  if (loading) return <Loading />;
                  if (error) return 'error...';
                  if (!data.customerReport)
                    return 'No results for this time period...';
                  const sharedProps = {
                    history,
                    location,
                    report: data.customerReport,
                  };
                  return (
                    <div>
                      {(() => {
                        switch (tab) {
                          case 'retirement':
                            return <Retirement {...sharedProps} />;
                          case 'benefits':
                            return <Benefits {...sharedProps} />;
                          case 'download':
                            return <Downloads {...sharedProps} />;
                          case 'eligibility':
                            return <Eligibility {...sharedProps} />;
                          case 'health':
                            return <HealthAndWelfare {...sharedProps} />;
                          default:
                            return <HealthAndWelfare {...sharedProps} />;
                        }
                      })()}
                    </div>
                  );
                }}
              </Query>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AppReports;
