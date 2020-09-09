import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import AccountForm from './AccountForm';
// APOLLO
import REFERRAL_PROFILE from 'ApolloClient/Queries/referralProfile';
import {useQuery} from 'react-apollo';

export default () => {
  const {data, loading, error} = useQuery(REFERRAL_PROFILE);
  if (loading) return null;
  console.log({data, loading, error});
  if (error) return 'error';

  // if (
  //   !data.currentUser ||
  //   !data.currentUser.referralProfile ||
  //   !data.currentUser.referralProfile.status
  // ) {
  //   return <AccountForm />;
  // }
  return <div>More Changes</div>;
};
