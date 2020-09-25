import React, {useState} from 'react';
import moment from 'moment';
// COMPONENTS
import PartnersSearchInput from './PartnersSearchInput';
import Row from 'components/common/Row';
import DatePicker from 'components/inputs/DatePicker';
import Col from 'components/common/Col';
import message from 'components/common/message';
import Button from 'components/common/Button';
import ErrorBlock from 'components/common/ErrorBlock';
// APOLLO
import {useMutation, useQuery} from 'react-apollo';
import UPDATE_CUSTOMER_REFERRAL_PARTNER from 'ApolloClient/Mutations/updateCustomerReferralPartner';
import REFERRAL_PARTNER_BY_ID from 'ApolloClient/Queries/referralPartnerById';

export default ({customer}) => {
  const [saving, setSaving] = useState(false);
  const [values, setValues] = useState(false);
  const [errors, setErrors] = useState([]);
  const [updateCustomerReferralPartner] = useMutation(
    UPDATE_CUSTOMER_REFERRAL_PARTNER
  );

  useQuery(REFERRAL_PARTNER_BY_ID, {
    variables: {
      id: customer.referralPartnerId,
    },
    skip: !customer.referralPartnerId,
    onCompleted: (data) => {
      if (data.referralPartnerById && data.referralPartnerById.customers) {
        // A referral partner may have multiple customers/companies assocaited with them.
        // Here we filter through the list and find the customer we're currently viewing
        let customerObj = data.referralPartnerById.customers.filter(
          (item) => item.id === customer.id
        )[0];
        setValues({
          referralPartnerId: data.referralPartnerById.id,
          referralStartDate: moment(parseInt(customerObj.referralStartDate)),
          referralEndDate: moment(parseInt(customerObj.referralEndDate)),
          defaultReferralPartner: `${data.referralPartnerById.email}`,
          defaultReferral: {
            id: data.referralPartnerById.id,
            email: `${data.referralPartnerById.email}`,
            firstName: `${data.referralPartnerById.firstName}`,
            lastName: `${data.referralPartnerById.lastName}`,
          },
        });
      }
    },
  });

  const onSaveChanges = async () => {
    try {
      if (!values.referralPartnerId) {
        return setErrors(['Please select a partner']);
      }
      if (!values.referralStartDate) {
        return setErrors(['Please select a date that payments should start']);
      }
      if (!values.referralEndDate) {
        return setErrors(['Please select a date that contract ends']);
      }
      setSaving(true);
      await updateCustomerReferralPartner({
        variables: {
          customerId: customer.id,
          referralPartnerId: values.referralPartnerId,
          referralStartDate: values.referralStartDate.valueOf().toString(),
          referralEndDate: values.referralEndDate.valueOf().toString(),
        },
        refetchQueries: [
          {
            query: REFERRAL_PARTNER_BY_ID,
            variables: {
              id: values.referralPartnerId,
            },
          },
        ],
      });
      setSaving(false);
      message.success(`Setting saved`);
    } catch (err) {
      setSaving(false);
      console.log(err);
    }
  };

  return (
    <div style={{width: 450}}>
      {errors && errors.length > 0 && <ErrorBlock errors={errors} />}
      <PartnersSearchInput
        value={values.referralPartnerId}
        defaultSearch={values.defaultReferralPartner}
        defaultValue={values.defaultReferral}
        onChange={(newValue) =>
          setValues({...values, referralPartnerId: newValue})
        }
      />
      <Row style={{marginTop: 24}}>
        <Col xs={12}>
          <DatePicker
            placeholder="Payment start date"
            value={values.referralStartDate}
            onChange={(newValue) =>
              setValues({...values, referralStartDate: newValue})
            }
          />
        </Col>
        <Col xs={12}>
          <DatePicker
            placeholder="Payment end date"
            value={values.referralEndDate}
            onChange={(newValue) =>
              setValues({...values, referralEndDate: newValue})
            }
          />
        </Col>
      </Row>

      <Button
        disabled={saving}
        onClick={onSaveChanges}
        style={{width: 145, marginTop: 24}}
      >
        {!saving ? 'Save Changes' : '...'}
      </Button>
    </div>
  );
};
