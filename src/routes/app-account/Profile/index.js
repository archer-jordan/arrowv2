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
  height: 32px;
  line-height: 32px;
  margin-bottom: 16px;
  margin-top: 40px;
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
    <Col xs={8}>
      <Label>{label}</Label>
    </Col>
    <Col xs={16}>
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
        <RowContainer>
          <Col xs={24}>
            <ColumnHeadline>Contact information</ColumnHeadline>
            <DataItem label="First Name" value={profile.firstName} />
            <DataItem label="Last Name" value={profile.lastName} />
            {profile.title && (
              <DataItem label="Role or Title" value={profile.title} />
            )}
            <DataItem label="Email" value={profile.email} />
            {profile.phone && <DataItem label="Phone" value={profile.phone} />}
          </Col>{' '}
          <Col xs={24}>
            <ColumnHeadline>Company information</ColumnHeadline>

            <Query
              query={customerById}
              variables={{id: this.props.currentUser.customerId}}
            >
              {({data, error, loading}) => {
                if (loading) return <Loading />;
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
                      label="Type"
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
