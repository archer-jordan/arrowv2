import React from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import moment from 'moment';
import {Row, Col} from 'react-styled-flexboxgrid';
// COMPONENTS
import Breadcrumb from 'components/common/Breadcrumb';
import HealthAndWelfare from './HealthAndWelfare';
import Eligibility from './Eligibility';
import Retirement from './Retirement';
import Benefits from './Benefits';
import DownloadXL from './DownloadXL';
import SideNav from 'components/common/SideNav';

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
  margin-top: 8px;
  text-decoration: underline;
  background: transparent;
  border: 0px;
  padding: 0px;
  &:focus {
    outline: 0;
  }
`;

class AppReports extends React.PureComponent {
  onParamChange = newValues => {
    let oldParams = queryString.parse(this.props.location.search);
    let newParams = {
      ...oldParams,
      ...newValues,
    };
    let newString = queryString.stringify(newParams);
    this.props.history.push(`?${newString}`);
  };
  componentWillMount() {
    let oldParams = queryString.parse(this.props.location.search);
    if (!oldParams.tab) {
      let month = moment()
        .format('MMMM')
        .toLowerCase();
      let year = moment()
        .format('YYYY')
        .toLowerCase();
      return this.onParamChange({month, year, tab: 'health'});
    }
    if (!oldParams.month) {
      let month = moment()
        .format('MMMM')
        .toLowerCase();
      let year = moment()
        .format('YYYY')
        .toLowerCase();
      return this.onParamChange({month, year});
    }
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
        <Row style={{marginTop: 16}}>
          <Col xs={12} md={8} />
          <Col xs={12} md={4}>
            {' '}
            <div style={{marginBottom: 32}}>
              <DateText>
                {month && month.toUpperCase()} {year && year}
              </DateText>
              <ChangeDate>Change Month</ChangeDate>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <SideNav items={this.getNavItems()} tab={tab} />
          </Col>
          <Col xs={9} md={8}>
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
