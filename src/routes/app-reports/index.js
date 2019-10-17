import React from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import moment from 'moment';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Breadcrumb from 'components/common/Breadcrumb';
import DatePicker from 'components/inputs/DatePicker';
import HealthAndWelfare from './HealthAndWelfare';
import Eligibility from './Eligibility';
import Retirement from './Retirement';
import Benefits from './Benefits';
import DownloadXL from './DownloadXL';
import SideNav from 'components/common/SideNav';

const {MonthPicker} = DatePicker;

const DateText = styled.div`
  color: #1371a3;
  text-align: right;
  font-size: 40px;
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
    return [
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
  };
  render() {
    const {location, history} = this.props;
    const sharedProps = {
      history,
      location,
    };
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
          <Col xs={24} md={8}>
            <SideNav items={this.getNavItems()} tab={tab} />
          </Col>
          <Col xs={24} md={16}>
            {' '}
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default AppReports;
