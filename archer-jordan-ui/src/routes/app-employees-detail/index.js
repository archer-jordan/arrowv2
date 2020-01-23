import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import MonthComponent from 'components/common/MonthComponent';
import SideNav from 'components/common/SideNav';
import Benefits from './Benefits';
import Financials from './Financials';
import Account from './Account';
import Select from 'components/inputs/SelectInput';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
// APOLLO
import employeeByIdQuery from 'ApolloClient/Queries/employeeById';
import {Query} from 'react-apollo';
import lib from 'babel-plugin-import';

const {Option} = Select;

const MobileDropdownNav = ({items, tab, onChange}) => (
  <div
    style={{
      marginTop: 24,
      marginBottom: 16,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
    }}
  >
    <Select value={tab} style={{width: 200}} onChange={onChange}>
      {items.map(item => (
        <Option key={item.activeValue}>{item.label}</Option>
      ))}
    </Select>
  </div>
);

class AppEmployeesDetail extends React.PureComponent {
  state = {
    editDate: false,
  };
  onParamChange = newValues => {
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
      let month = moment()
        .format('MMMM')
        .toLowerCase();
      let year = moment()
        .format('YYYY')
        .toLowerCase();
      return this.onParamChange({month, year, tab: 'benefits'});
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
        label: 'Account',
        activeValue: 'account',
        onClick: () =>
          this.onParamChange({
            tab: 'account',
          }),
      },
    ];
  };
  render() {
    const {location, history} = this.props;

    let employeeId = this.props.employeeId || this.props.match.params.id;

    const {tab, month, year} = queryString.parse(location.search);

    return (
      <Query
        query={employeeByIdQuery}
        variables={{id: employeeId}}
        fetchPolicy="cache-and-network"
      >
        {({error, loading, data}) => {
          if (loading) return null;
          if (error) return null;
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
              <div>
                <Link to="/employees">Employees</Link> / {employee.firstName}{' '}
                {employee.lastName} / {helpers.capitalize(tab)}{' '}
              </div>
              <Row>
                <Col xs={24} md={16} />
                <Col xs={24} md={0}>
                  <MobileDropdownNav
                    items={this.getNavItems()}
                    tab={tab}
                    onChange={tab => this.onParamChange({tab})}
                  />
                </Col>
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
                        case 'account':
                          return <Account {...sharedProps} />;
                        case 'password':
                          return <div {...sharedProps} />;
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

export default AppEmployeesDetail;
