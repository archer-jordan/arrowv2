import React, {useState} from 'react';
// COMPONENTS
import AccountForm from './AccountForm';
import Loading from 'components/common/Loading';
import message from 'components/common/message';
// APOLLO
import REFERRAL_PROFILE from 'ApolloClient/Queries/referralProfile';
import SAVE_REFERRAL_PARTNER from 'ApolloClient/Mutations/saveReferralPartner';
import {useQuery, useMutation} from 'react-apollo';

export default () => {
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveReferralPartner] = useMutation(SAVE_REFERRAL_PARTNER);
  const {loading, error} = useQuery(REFERRAL_PROFILE, {
    onCompleted: (data) => {
      setValues(data.currentUser.referralProfile);
    },
  });
  if (loading) return <Loading />;
  if (error) return 'error';

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      let id = values.id;
      let params = {
        ...values,
      };

      // we'll need to delete some fields from our params, otherwise the mutation will spit an error for unknown values
      delete params.id;
      delete params.__typename;
      delete params.customers;

      if (params.w9Doc && params.w9Doc.key) {
        delete params.w9Doc.__typename;
      } else {
        delete params.w9Doc;
      }
      if (params.achDoc && params.achDoc.key) {
        delete params.achDoc.__typename;
      } else {
        delete params.achDoc;
      }
      if (params.parterAgreementDoc && params.parterAgreementDoc.key) {
        delete params.parterAgreementDoc.__typename;
      } else {
        delete params.parterAgreementDoc;
      }

      // set loading
      setSaving(true);

      // call he muation
      await saveReferralPartner({
        variables: {
          id,
          params,
        },
      });

      // let user know it was successful
      message.success(`Profile saved`);

      // turn the loader off
      setSaving(false);
    } catch (err) {
      setSaving(false);
      console.log(err);
    }
  };

  return (
    <AccountForm
      values={values}
      onSubmit={onSubmit}
      loading={saving}
      onChange={(newValue) => {
        setValues({
          ...values,
          ...newValue,
        });
      }}
    />
  );
};
