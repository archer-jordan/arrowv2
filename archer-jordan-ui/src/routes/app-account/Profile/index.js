import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';

const ColumnHeadline = styled(BigValue)`
  font-size: 24px;
  min-height: 24px;
  line-height: 24px;
  @media only screen and (max-width: 1200px) {
    font-size: 18px;
    min-height: 18px;
    line-height: 18px;
  }
`;

const Outline = styled.div`
  background: #e5eff5;
  border-radius: 25px;
  height: 40px;
  padding: 8px 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

const Label = styled(BigValue)`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  min-height: 16px;
  margin-bottom: 16px;
  @media only screen and (max-width: 1200px) {
    font-size: 18px;
    min-height: 18px;
    line-height: 18px;
  }
`;

const Value = styled(Label)`
  font-weight: 400;
  @media only screen and (max-width: 1200px) {
    font-size: 18px;
    min-height: 18px;
    line-height: 18px;
  }
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
    const {currentUser} = this.props;

    return (
      <div>
        <RowContainer>
          <Col xs={24}>
            <Outline>
              <ColumnHeadline>Contact information</ColumnHeadline>
            </Outline>
            <div style={{paddingLeft: 16}}>
              <DataItem label="First Name" value={currentUser.firstName} />
              <DataItem label="Last Name" value={currentUser.lastName} />
              {currentUser.title && (
                <DataItem label="Role or Title" value={currentUser.title} />
              )}
              <DataItem label="Email" value={currentUser.email} />
              {currentUser.phone && (
                <DataItem label="Phone" value={currentUser.phone} />
              )}
              {currentUser &&
                currentUser.employee &&
                currentUser.employee.gender && (
                  <DataItem
                    label="Gender"
                    value={currentUser.employee.gender}
                  />
                )}
              {currentUser &&
                currentUser.employee &&
                currentUser.employee.dob && (
                  <DataItem
                    label="DOB"
                    value={moment(parseInt(currentUser.employee.dob)).format(
                      'M/D/YY'
                    )}
                  />
                )}
              {currentUser &&
                currentUser.employee &&
                currentUser.employee.street && (
                  <DataItem
                    label="Street"
                    value={currentUser.employee.street}
                  />
                )}
              {currentUser &&
                currentUser.employee &&
                currentUser.employee.city && (
                  <DataItem label="City" value={currentUser.employee.city} />
                )}
              {currentUser &&
                currentUser.employee &&
                currentUser.employee.state && (
                  <DataItem label="State" value={currentUser.employee.state} />
                )}
              {currentUser &&
                currentUser.employee &&
                currentUser.employee.zip && (
                  <DataItem label="Zip" value={currentUser.employee.zip} />
                )}
              {currentUser &&
                currentUser.employee &&
                currentUser.employee.hireDate && (
                  <DataItem
                    label="Hire Date"
                    value={moment(
                      parseInt(currentUser.employee.hireDate)
                    ).format('M/D/YY')}
                  />
                )}
            </div>
          </Col>{' '}
          {/* <Col xs={24}>
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
          </Col>*/}
        </RowContainer>
      </div>
    );
  }
}

export default Profile;
