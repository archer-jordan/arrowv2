import React from 'react';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Breadcrumb from 'components/common/Breadcrumb';
import SideNav from 'components/common/SideNav';
import Profile from './Profile';
// APOLLO
import {Query} from 'react-apollo';
import customerByIdQuery from 'ApolloClient/Queries/customerById';

class AdminCustomerDetail extends React.PureComponent {
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
      return this.onParamChange({tab: 'profile'});
    }
  };
  componentWillMount() {
    this.checkParams();
  }
  getTab = tab => {
    switch (tab) {
      case 'profile':
        return 'Profile';
      case 'contacts':
        return 'Contacts';
      case 'status':
        return 'Status';
      case 'plan':
        return 'Plan';
      case 'users':
        return 'Users';
      case 'documents':
        return 'Documents';
      case 'employees':
        return 'Employees';
      case 'override':
        return 'Override';
      case 'database':
        return 'Database';
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
        label: 'Contacts',
        activeValue: 'contacts',
        onClick: () =>
          this.onParamChange({
            tab: 'contacts',
          }),
      },
      {
        label: 'Status',
        activeValue: 'status',
        onClick: () =>
          this.onParamChange({
            tab: 'status',
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
        label: 'Users',
        activeValue: 'users',
        onClick: () =>
          this.onParamChange({
            tab: 'users',
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
      {
        label: 'Employees',
        activeValue: 'employees',
        onClick: () =>
          this.onParamChange({
            tab: 'employees',
          }),
      },
      {
        label: 'Override',
        activeValue: 'override',
        onClick: () =>
          this.onParamChange({
            tab: 'override',
          }),
      },
      {
        label: 'Database',
        activeValue: 'database',
        onClick: () =>
          this.onParamChange({
            tab: 'database',
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
        <Query
          query={customerByIdQuery}
          variables={{id: this.props.match.params.id}}
        >
          {({loading, data, error}) => {
            if (loading) return 'loading...';
            if (error) return 'error...';
            console.log(data);
            const customer = data.customerById;
            return (
              <React.Fragment>
                <Breadcrumb
                  crumbs={[
                    <Link to="/admin/customers">Customers</Link>,
                    customer.title,
                    this.getTab(tab),
                  ]}
                />
                <Row style={{marginTop: 32}}>
                  <Col xs={24} md={6}>
                    <SideNav items={this.getNavItems()} tab={tab} />
                  </Col>
                  <Col xs={24} md={18}>
                    {' '}
                    <div>
                      {(() => {
                        switch (tab) {
                          case 'profile':
                            return <Profile {...sharedProps} />;
                          case 'benefits':
                            return <div {...sharedProps} />;
                          case 'download':
                            return <div {...sharedProps} />;
                          case 'eligibility':
                            return <div {...sharedProps} />;
                          case 'health':
                            return <div {...sharedProps} />;
                          default:
                            return <div {...sharedProps} />;
                        }
                      })()}
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default AdminCustomerDetail;
