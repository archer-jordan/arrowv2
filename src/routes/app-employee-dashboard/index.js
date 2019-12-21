import React from 'react';
import queryString from 'query-string';
import moment from 'moment';
import EmployeeDashboard from './EmployeeDashboard';

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
    const {currentUser} = this.props;

    if (currentUser && currentUser.roles.includes('coEmployee')) {
      return (
        <EmployeeDashboard
          employeeId={currentUser.employeeId}
          {...this.props}
        />
      );
    }

    return null;
  }
}

export default AppReports;
