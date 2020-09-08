import React from 'react';
import queryString from 'query-string';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
// COMPONENTS
import Breadcrumb from 'components/common/Breadcrumb';
import SideNav from 'components/common/SideNav';
// import Plan from './Plan';
import Profile from './Profile';
import Password from './Password';
import Documents from './Documents';

class AppAccount extends React.PureComponent {
  onParamChange = (newValues) => {
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
  getTab = (tab) => {
    switch (tab) {
      case 'profile':
        return 'Profile';
      case 'password':
        return 'Password';
      case 'documents':
        return 'Documents';
      default:
        return null;
    }
  };
  getNavItems = () => {
    let items = [
      {
        label: 'Profile',
        activeValue: 'profile',
        onClick: () =>
          this.onParamChange({
            tab: 'profile',
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
      {
        label: 'Documents',
        activeValue: 'documents',
        onClick: () =>
          this.onParamChange({
            tab: 'documents',
          }),
      },
    ];

    return items;
  };
  render() {
    const {location, currentUser, history} = this.props;
    const sharedProps = {
      history,
      location,
      currentUser,
    };
    const {tab} = queryString.parse(location.search);

    return (
      <div style={{padding: 8}}>
        <Breadcrumb crumbs={['Account', this.getTab(tab)]} />
        <Row style={{marginTop: 80}}>
          <Col xs={24} md={6}>
            <SideNav items={this.getNavItems()} tab={tab} />
          </Col>
          <Col xs={18} md={18}>
            {' '}
            <div>
              {(() => {
                switch (tab) {
                  case 'profile':
                    return <Profile {...sharedProps} />;
                  case 'password':
                    return <Password {...sharedProps} />;
                  case 'documents':
                    return <Documents {...sharedProps} />;
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
