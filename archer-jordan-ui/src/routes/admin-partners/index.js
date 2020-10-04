import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import PartnersTable from './PartnersTable';
import InvitePartner from './InvitePartner';
// APOLLO
import {useQuery} from 'react-apollo';
import REFERRAL_PARTNERS from 'ApolloClient/Queries/referralPartners';

const Container = styled.div`
  width: 900px;
  margin: auto;
  max-width: 100%;
  margin-top: 40px;
`;

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
    <Container>
      <InvitePartner />
      <div style={{marginTop: 32}}>
        <PartnersTable
          total={
            (data && data.referralPartners && data.referralPartners.count) || 0
          }
          dataSource={profiles || []}
          loading={loading}
        />
      </div>
    </Container>
  );
};
