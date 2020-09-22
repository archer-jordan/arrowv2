import React from 'react';
// COMPONENTS
import SettingsForm from './SettingsForm';
import PartnersTable from './PartnersTable';
// APOLLO
import {useQuery} from 'react-apollo';
import REFERRAL_PARTNERS from 'ApolloClient/Queries/referralPartners';

export default () => {
  const {data, loading} = useQuery(REFERRAL_PARTNERS, {
    variables: {
      roles: ['referral'],
    },
  });

  let profiles = [];

  if (data && data.referralPartners && data.referralPartners.users) {
    data.referralPartners.users.forEach((user) => {
      if (user.referralProfile) {
        profiles.push(user.referralProfile);
      }
    });
  }

  return (
    <>
      <SettingsForm />
      <div style={{marginTop: 32}}>
        <PartnersTable
          total={
            (data && data.referralPartners && data.referralPartners.count) || 0
          }
          dataSource={profiles || []}
          loading={loading}
        />
      </div>
    </>
  );
};
