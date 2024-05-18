import React from 'react';
import queryString from 'query-string';
import moment from 'moment';
// APOLLO
import employeeByIdQuery from 'ApolloClient/Queries/employeeById';
import {Query} from 'react-apollo';
// COMPONENTS
import Enrollment from './Enrollment';
import Benefits from '../../app-employees-detail/Benefits'; // re-used from app-employees-detail
import Financials from '../../app-employees-detail/Financials'; // re-used from app-employees-detail
// COMPONENTS
import Row from 'components/common/Row';
import Loading from 'components/common/Loading';
import Col from 'components/common/Col';
import MonthComponent from 'components/common/MonthComponent';
import SideNav from 'components/common/SideNav';

class EmployeeDashboard extends React.PureComponent {
  state = {
    editDate: false,
  };
  onParamChange = (newValues) => {
    let oldParams =
      this.props.location &&
      this.props.location.search &&
      queryString.parse(this.props.location.search);
    let newParams = {
      ...oldParams,
      ...newValues,
    };
    let newString = queryString.stringify(newParams);
    this.props.history.push(`?${newString}`);
  };
  checkParams = () => {
    let oldParams =
      this.props.location &&
      this.props.location.search &&
      queryString.parse(this.props.location.search);
    if (!oldParams || (!oldParams.tab && oldParams.tab !== 'null')) {
      let month = moment().format('MMMM').toLowerCase();
      let year = moment().format('YYYY').toLowerCase();
      return this.onParamChange({month, year, tab: 'benefits'});
    }
    if (
      (!oldParams.year && oldParams.year !== 'null') ||
      (!oldParams.month && oldParams.month !== 'null')
    ) {
      let month = moment().format('MMMM').toLowerCase();
      let year = moment().format('YYYY').toLowerCase();
      return this.onParamChange({month, year});
    }
  };
  componentWillMount() {
    let oldParams =
      this.props.location &&
      this.props.location.search &&
      queryString.parse(this.props.location.search);
    if (oldParams.tab === 'health') {
      return this.onParamChange({tab: 'benefits'});
    }
    this.checkParams();
  }
  getNavItems = () => {
    return [
      {
        label: 'Benefits',
        activeValue: 'benefits',
        onClick: () =>
          this.onParamChange({
            tab: 'benefits',
          }),
      },
      {
        label: 'Financials',
        activeValue: 'financials',
        onClick: () =>
          this.onParamChange({
            tab: 'financials',
          }),
      },
      {
        label: 'Enrollment',
        activeValue: 'enrollment',
        onClick: () =>
          this.onParamChange({
            tab: 'enrollment',
          }),
      },
    ];
  };
  render() {
    const {location, history, employeeId} = this.props;
    const {tab, month, year} = queryString.parse(location.search);

    return (
      <Query
        query={employeeByIdQuery}
        variables={{id: employeeId}}
        fetchPolicy="cache-and-network"
      >
        {({data, loading, error}) => {
          if (loading) return <Loading />;
          if (error) {
            console.log(error.message);
            return 'error';
          }
          let employee = data.employeeById;
          const sharedProps = {
            history,
            location,
            month,
            year,
            employee,
            employeeId,
          };
          return (
            <div>
              <Row>
                <Col xs={24} md={16} />
                <Col xs={24}>
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
                  {' '}
                  <div>
                    {(() => {
                      switch (tab) {
                        case 'financials':
                          return <Financials {...sharedProps} />;
                        case 'benefits':
                          return <Benefits {...sharedProps} />;
                        case 'enrollment':
                          return <Enrollment {...sharedProps} />;
                        default:
                          return <div {...sharedProps} />;
                      }
                    })()}
                  </div>
                </Col>
              </Row>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default EmployeeDashboard;
