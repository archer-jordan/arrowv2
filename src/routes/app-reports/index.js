import React from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import {Row, Col} from 'react-styled-flexboxgrid';
// COMPONENTS
import Breadcrumb from 'components/common/Breadcrumb';
import HealthAndWelfare from './HealthAndWelfare';
import Eligibility from './Eligibility';
import Retirement from './Retirement';
import Benefits from './Benefits';
import DownloadXL from './DownloadXL';
import SideNav from './SideNav';

const DateText = styled.div`
  color: #1371a3;
  text-align: right;
  font-size: 40px;
`;

const ChangeDate = styled.div`
  color: ${p => p.theme.colors.support1};
  text-align: right;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
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
      this.props.history.push(`/reports?tab=health`);
    }
  }
  getTab = tab => {
    switch (tab) {
      case 'health':
        return 'Health & Welfare';
      case 'eligibility':
        return 'Eligibility';
      default:
        return null;
    }
  };
  render() {
    const {location, history} = this.props;
    const sharedProps = {
      history,
      location,
    };
    const {tab} = queryString.parse(location.search);

    return (
      <div style={{padding: 8}}>
        <Breadcrumb crumbs={['Reports', this.getTab(tab)]} />
        <Row style={{marginTop: 16}}>
          <Col xs={12} md={8} />
          <Col xs={12} md={4}>
            {' '}
            <div style={{marginBottom: 32}}>
              <DateText>JANUARY 2019</DateText>
              <ChangeDate>Change Month</ChangeDate>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <SideNav onParamChange={this.onParamChange} tab={tab} />
          </Col>
          <Col xs={9}>
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
