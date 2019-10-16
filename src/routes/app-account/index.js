import React from 'react';
import queryString from 'query-string';
import {Row, Col} from 'react-styled-flexboxgrid';
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
          <Col xs={12} md={4}>
            <SideNav items={this.getNavItems()} tab={tab} />
          </Col>
          <Col xs={9} md={8}>
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
