import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
// COMPONENTS
import Input from 'components/inputs/Input';
import ParterTypeInput from 'components/inputs/PartnerTypeInput';
import FormItem from 'components/common/FormItem';
import Button from 'components/common/Button';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import UploadInput from './UploadInput';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

const DataBold = styled.h3`
  font-weight: 900;
  font-size: 18px;
`;

const DataThin = styled.span`
  font-weight: 400;
  font-size: 18px;
`;

const Container = styled.div`
  padding-top: 40px;
  width: 400px;
`;

export default ({values, loading, onChange, onSubmit}) => {
  if (!values) return null;
  return (
    <Container>
      <DataBold>
        Application Submitted:{' '}
        <DataThin>
          {values.applicationSubmittedDate &&
            moment(parseInt(values.applicationSubmittedDate)).format(
              'MM/DD/YYYY'
            )}
        </DataThin>
      </DataBold>
      <DataBold>
        Status: <DataThin>{helpers.capitalize(values.status)}</DataThin>
      </DataBold>
      <form onSubmit={onSubmit}>
        <FormItem required>
          <Input
            placeholder="First Name"
            value={values.firstName || ''}
            onChange={(e) => onChange({firstName: e.target.value})}
          />
        </FormItem>
        <FormItem required>
          <Input
            placeholder="Last Name"
            value={values.lastName || ''}
            onChange={(e) => onChange({lastName: e.target.value})}
          />
        </FormItem>
        <FormItem required>
          <Input
            placeholder="Email"
            value={values.email || ''}
            onChange={(e) => onChange({email: e.target.value})}
          />
        </FormItem>
        <FormItem required>
          <Input
            placeholder="Phone"
            value={values.phone || ''}
            onChange={(e) => onChange({phone: e.target.value})}
          />
        </FormItem>
        <FormItem required>
          <Input
            placeholder="Address"
            value={values.address || ''}
            onChange={(e) => onChange({address: e.target.value})}
          />
        </FormItem>
        <Row gutter={6}>
          <Col xs={12}>
            <FormItem required>
              <Input
                placeholder="City"
                value={values.city || ''}
                onChange={(e) => onChange({city: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={4}>
            <FormItem required>
              <Input
                placeholder="State"
                value={values.state || ''}
                onChange={(e) => onChange({state: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={8}>
            <FormItem required>
              <Input
                placeholder="Zip"
                value={values.zip || ''}
                onChange={(e) => onChange({zip: e.target.value})}
              />
            </FormItem>
          </Col>
        </Row>
        <FormItem required>
          <ParterTypeInput
            value={values.partnerType}
            placeholder={`What type of partner are you?`}
            onChange={(newValue) => onChange({partnerType: newValue})}
          />
        </FormItem>
        {/*  <UploadInput
          label="W9"
          onChange={(newValue) => onChange({w9Doc: newValue})}
          file={values.w9Doc}
          templateUrl="https://www.irs.gov/pub/irs-pdf/fw9.pdf"
        />
     <UploadInput
          label="ACH Authorization Form"
          file={values.achDoc}
          onChange={(newValue) => onChange({achDoc: newValue})}
        />
        <UploadInput
          label="Partner Agreement"
          file={values.parterAgreementDoc}
          onChange={(newValue) => onChange({parterAgreementDoc: newValue})}
        /> */}
        <FormItem>
          <Button
            disabled={loading}
            type="submit"
            style={{width: 160}}
            onClick={onSubmit}
          >
            {!loading ? 'Save Changes' : '...'}
          </Button>
        </FormItem>
      </form>
    </Container>
  );
};
