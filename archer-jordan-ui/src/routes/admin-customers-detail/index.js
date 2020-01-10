import React from 'react';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
// COMPONENTS
import Row from 'components/common/Row';
import message from 'components/common/message';
import Col from 'components/common/Col';
import Breadcrumb from 'components/common/Breadcrumb';
import SideNav from 'components/common/SideNav';
import Loading from 'components/common/Loading';
import Profile from './Profile';
import Employees from './Employees';
import Contacts from './Contacts';
import Status from './Status';
import Users from './Users';
import Override from './Override';
import Documents from './Documents';
import Plan from './Plan';
// APOLLO
import {Query, graphql} from 'react-apollo';
import customerByIdQuery from 'ApolloClient/Queries/customerById';
import saveCustomer from 'ApolloClient/Mutations/saveCustomer';

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
  onSaveChanges = async newValues => {
    try {
      this.props.saveCustomer({
        variables: {
          id: this.props.match.params.id,
          params: {
            ...newValues,
          },
        },
      });
      message.success('Customer saved!');
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const {location, history} = this.props;
    const {tab} = queryString.parse(location.search);

    // TODO: which query we use depends if it's an admin or a regular employee

    return (
      <div style={{padding: 8}}>
        <Query
          query={customerByIdQuery}
          variables={{id: this.props.match.params.id}}
        >
          {({loading, data, error}) => {
            if (loading) return <Loading />;
            if (error) return 'error...';
            const customer = data.customerById;
            const sharedProps = {
              history,
              location,
              customer,
              saving: this.state.saving,
              onSaveChanges: this.onSaveChanges,
            };
            return (
              <React.Fragment>
                <Breadcrumb
                  crumbs={[
                    <Link to="/admin/customers">Customers</Link>,
                    customer.title,
                    this.getTab(tab),
                  ]}
                />
                <Row gutter={32} style={{marginTop: 32}}>
                  <Col xs={24} md={4}>
                    <SideNav items={this.getNavItems()} tab={tab} />
                  </Col>
                  <Col xs={24} md={20}>
                    {' '}
                    <div>
                      {(() => {
                        switch (tab) {
                          case 'profile':
                            return <Profile {...sharedProps} />;
                          case 'employees':
                            return <Employees {...sharedProps} />;
                          case 'users':
                            return <Users {...sharedProps} />;
                          case 'status':
                            return <Status {...sharedProps} />;
                          case 'contacts':
                            return <Contacts {...sharedProps} />;
                          case 'override':
                            return <Override {...sharedProps} />;
                          case 'plan':
                            return <Plan {...sharedProps} />;
                          case 'documents':
                            return <Documents {...sharedProps} />;
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

export default graphql(saveCustomer, {name: 'saveCustomer'})(
  AdminCustomerDetail
);
