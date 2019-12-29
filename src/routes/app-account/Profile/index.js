import React from 'react';
import styled from 'styled-components';
// COMPONENTS
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
  height: 24px;
  line-height: 24px;
  margin-bottom: 16px;
`;

const Outline = styled.div`
  background: #e5eff5;
  border-radius: 25px;
  height: 40px;
  padding: 8px 16px;
  margin-bottom: 16px;
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
    <Col xs={12} md={4}>
      <Label>{label}</Label>
    </Col>
    <Col xs={12} md={20}>
      <Value>{value}</Value>
    </Col>
  </Row>
);

const RowContainer = styled(Row)`
  max-width: 100%;
  min-height: 500px;
  width: 700px;
  @media only screen and (max-width: 414px) {
    padding: 0px;
  }
`;

class Profile extends React.PureComponent {
  render() {
    const profile = this.props.currentUser;

    return (
      <div>
        <RowContainer>
          <Col xs={24}>
            <Outline>
              <ColumnHeadline>Contact information</ColumnHeadline>
            </Outline>
            <div style={{paddingLeft: 16}}>
              <DataItem label="First Name" value={profile.firstName} />
              <DataItem label="Last Name" value={profile.lastName} />
              {profile.title && (
                <DataItem label="Role or Title" value={profile.title} />
              )}
              <DataItem label="Email" value={profile.email} />
              {profile.phone && (
                <DataItem label="Phone" value={profile.phone} />
              )}
            </div>
          </Col>{' '}
          <Col xs={24}>
            <Outline style={{marginTop: 32}}>
              <ColumnHeadline>Company information</ColumnHeadline>
            </Outline>
            <Query
              query={customerById}
              variables={{id: this.props.currentUser.customerId}}
            >
              {({data, error, loading}) => {
                if (loading) return <Loading />;
                if (error) return 'Error';
                let customer = data.customerById;
                return (
                  <div style={{paddingLeft: 16}}>
                    {' '}
                    {customer.title && (
                      <DataItem label="Name" value={customer.title} />
                    )}
                    {customer.street && (
                      <DataItem label="Address" value={customer.street} />
                    )}
                    {customer.city && (
                      <DataItem label="City" value={customer.city} />
                    )}
                    {customer.state && (
                      <DataItem label="State" value={customer.state} />
                    )}
                    {customer.zip && (
                      <DataItem label="Zip" value={customer.zip} />
                    )}
                    {customer.companyType && (
                      <DataItem
                        label="Type"
                        value={helpers.mapCompanyTypeToLabel(
                          customer.companyType
                        )}
                      />
                    )}
                    {customer.ein && (
                      <DataItem label="EIN #" value={customer.ein} />
                    )}{' '}
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
