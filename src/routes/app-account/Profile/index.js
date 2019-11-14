import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import Loading from 'components/common/Loading';
// APOLLO
import {Query} from 'react-apollo';
import customerById from 'ApolloClient/Queries/customerById';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

const ColumnHeadline = styled(BigValue)`
  font-size: 24px;
  height: 32px;
  line-height: 32px;
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;

const MobileHeadline = styled(BigValue)`
  font-size: 24px;
  height: 32px;
  line-height: 32px;
  display: none;
  margin-bottom: 16px;
  margin-top: 16px;
  @media only screen and (max-width: 414px) {
    display: inherit;
  }
`;

const MobileTopContainer = styled(TopContainer)`
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;

const Label = styled(BigValue)`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  height: 16px;
  margin-bottom: 16px;
`;

const Value = styled(Label)`
  font-weight: 400;
`;

const DataItem = ({label = ' ', value = ''}) => (
  <Row>
    <Col xs={12}>
      <Label>{label}</Label>
    </Col>
    <Col xs={12}>
      <Value>{value}</Value>
    </Col>
  </Row>
);

const RowContainer = styled(Row)`
  width: 100%;
  padding: 24px;
  min-height: 500px;
  @media only screen and (max-width: 414px) {
    padding: 0px;
  }
`;

class Profile extends React.PureComponent {
  render() {
    const profile = this.props.currentUser;

    return (
      <div>
        <MobileTopContainer>
          <Row style={{width: '100%'}}>
            <Col xs={24} sm={12}>
              <ColumnHeadline>Contact information</ColumnHeadline>
            </Col>
            <Col xs={24} sm={12}>
              <ColumnHeadline>Company information</ColumnHeadline>
            </Col>
          </Row>
        </MobileTopContainer>
        <RowContainer>
          <Col xs={24} sm={10}>
            <MobileHeadline>Contact information</MobileHeadline>
            <DataItem label="First Name" value={profile.firstName} />
            <DataItem label="Last Name" value={profile.lastName} />
            <DataItem label="Role or Title" value={profile.title} />{' '}
            <DataItem label="Email" value={profile.email} />
            <DataItem label="Phone" value={profile.phone} />
          </Col>{' '}
          <Col
            xs={0}
            sm={2}
            style={{display: 'flex', justifyContent: 'center'}}
          >
            <div style={{width: 2, height: 200, background: '#efefef'}} />
          </Col>
          <Col xs={24} sm={10}>
            <MobileHeadline>Company information</MobileHeadline>
            <Query
              query={customerById}
              variables={{id: this.props.currentUser.companyId}}
            >
              {({data, error, loading}) => {
                if (loading) return <Loading />;
                console.log(data.customerById);
                let customer = data.customerById;
                return (
                  <div>
                    {' '}
                    <DataItem label="Name" value={customer.title} />
                    <DataItem label="Address" value={customer.street} />
                    <DataItem label="City" value={customer.city} />
                    <DataItem label="State" value={customer.state} />
                    <DataItem label="Zip" value={customer.zip} />
                    <DataItem
                      label="Company Type"
                      value={helpers.mapCompanyTypeToLabel(
                        customer.companyType
                      )}
                    />
                    <DataItem label="EIN #" value={customer.ein} />{' '}
                  </div>
                );
              }}
            </Query>
          </Col>
        </RowContainer>
      </div>
    );
  }
}

export default Profile;
