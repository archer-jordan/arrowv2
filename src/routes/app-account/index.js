import React from 'react';
import queryString from 'query-string';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
// COMPONENTS
import Breadcrumb from 'components/common/Breadcrumb';
import SideNav from 'components/common/SideNav';

class AppAccount extends React.PureComponent {
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
      return this.onParamChange({tab: 'profile'});
    }
  }
  getTab = tab => {
    switch (tab) {
      case 'profile':
        return 'Profile';
      case 'plan':
        return 'Plan';
      case 'password':
        return 'Password';
      default:
        return null;
    }
  };
  getNavItems = () => {
    return [
      {
        label: 'Profile',
        activeValue: 'profile',
        onClick: () =>
          this.onParamChange({
            tab: 'profile',
          }),
      },
      {
        label: 'Plan',
        activeValue: 'plan',
        onClick: () =>
          this.onParamChange({
            tab: 'plan',
          }),
      },
      {
        label: 'Password',
        activeValue: 'password',
        onClick: () =>
          this.onParamChange({
            tab: 'password',
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
    const {tab} = queryString.parse(location.search);

    return (
      <div style={{padding: 8}}>
        <Breadcrumb crumbs={['Reports', this.getTab(tab)]} />
        <Row style={{marginTop: 120}}>
          <Col xs={24} md={8}>
            <SideNav items={this.getNavItems()} tab={tab} />
          </Col>
          <Col xs={18} md={16}>
            {' '}
            <div>
              {(() => {
                switch (tab) {
                  case 'profile':
                    return <div {...sharedProps} />;
                  case 'plan':
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
  }
}

export default AppAccount;
