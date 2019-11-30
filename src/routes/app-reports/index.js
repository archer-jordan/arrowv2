import React from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import moment from 'moment';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Loading from 'components/common/Loading';
import Breadcrumb from 'components/common/Breadcrumb';
import MonthPicker from 'components/inputs/MonthPicker';
import HealthAndWelfare from './HealthAndWelfare';
import Eligibility from './Eligibility';
import Retirement from './Retirement';
import Benefits from './Benefits';
import DownloadXL from './DownloadXL';
import SideNav from 'components/common/SideNav';
// APOLLO
import {Query} from 'react-apollo';
import customerReport from 'ApolloClient/Queries/customerReport';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

const DateText = styled.div`
  color: #1371a3;
  text-align: right;
  font-size: 40px;
`;

const DatePickerBackground = styled.div`
  position: fixed;
  background: transparent;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
`;

const ChangeDate = styled.button`
  color: ${p => p.theme.colors.support1};
  text-align: right;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  text-decoration: underline;
  background: transparent;
  border: 0px;
  padding: 0px;
  &:focus {
    outline: 0;
  }
`;

class AppReports extends React.PureComponent {
  state = {
    editDate: false,
  };
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
        label: 'Download XL',
        activeValue: 'download',
        onClick: () =>
          this.onParamChange({
            tab: 'download',
          }),
      },
    ];

    console.log(this.state.queryData && this.state.queryData.customerReport);
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

    const {tab, month, year} = queryString.parse(location.search);

    return (
      <div style={{padding: 8}}>
        <Breadcrumb crumbs={['Reports', this.getTab(tab)]} />
        <Row>
          <Col xs={24} md={16} />
          <Col xs={24}>
            {' '}
            <div style={{marginBottom: 16}}>
              <DateText>
                {month && month.toUpperCase()} {year && year}
              </DateText>
              <div style={{position: 'relative'}}>
                <ChangeDate
                  onClick={() =>
                    this.setState({editDate: !this.state.editDate})
                  }
                >
                  Change Month
                </ChangeDate>
                <div style={{opacity: 0, position: 'absolute', right: 0}}>
                  <MonthPicker
                    open={this.state.editDate}
                    value={month && moment(`${month} ${year}`, 'MMMM YYYY')}
                    onChange={value =>
                      this.onParamChange({
                        month: value.format('MMMM'),
                        year: value.format('YYYY'),
                      })
                    }
                  />
                </div>
              </div>
            </div>
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
                            return <DownloadXL {...sharedProps} />;
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
        {this.state.editDate && (
          <DatePickerBackground
            onClick={() => this.setState({editDate: false})}
          />
        )}
      </div>
    );
  }
}

export default AppReports;
