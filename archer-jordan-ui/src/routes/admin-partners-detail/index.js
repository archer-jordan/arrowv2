import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import moment from 'moment';
// COMPONENTS
import Loading from 'components/common/Loading';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import PartnerReportsTable from 'components/common/PartnerReportsTable';
import CompaniesTable from './CompaniesTable';
import Select from 'components/inputs/SelectInput';
import DropdownStyleWrapper from 'components/inputs/DropdownStyleWrapper';
// APOLLO
import {useQuery, useMutation} from 'react-apollo';
import REFERRAL_PARTNER_BY_ID from 'ApolloClient/Queries/referralPartnerById';
import SAVE_REFERRAL_PARTNER from 'ApolloClient/Mutations/saveReferralPartner';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

const {Option} = Select;

const DataBold = styled.h3`
  font-weight: 900;
  font-size: 18px;
  margin-bottom: 4px;
`;

const DataThin = styled.span`
  font-weight: 400;
  font-size: 18px;
`;

const BackLink = styled(Link)`
  color: ${(p) => p.theme.colors.neutral7} !important;
`;

const LoadingOverlay = styled.div`
  z-index: 1000;
  background: rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export default ({match}) => {
  const [viewReports, setViewReports] = useState(null); //
  const [saving, setSaving] = useState(false);
  const [saveReferralPartner] = useMutation(SAVE_REFERRAL_PARTNER);
  const {data, loading, error} = useQuery(REFERRAL_PARTNER_BY_ID, {
    variables: {
      id: match.params.id,
    },
  });

  if (loading) return <Loading />;

  if (error) return 'Error';

  let profile = data && data.referralPartnerById;

  const onChangeStatus = async (status) => {
    try {
      setSaving(true);
      await saveReferralPartner({
        variables: {
          id: match.params.id,
          params: {
            status,
          },
        },
        refetchQueries: [
          {
            query: REFERRAL_PARTNER_BY_ID,
            variables: {
              id: match.params.id,
            },
          },
        ],
      });
      setSaving(false);
    } catch (err) {
      setSaving(false);
      console.log(err);
    }
  };

  return (
    <>
      {saving && (
        <LoadingOverlay>
          <Loading />
        </LoadingOverlay>
      )}
      <BackLink to={`/admin/partners`}>
        <Icon type="arrow-left" style={{fontSize: 14, marginRight: 4}} />
        Back to Partners
      </BackLink>
      <div style={{paddingTop: 40}}>
        <DataBold>
          Application Submitted:{' '}
          <DataThin>
            {moment(parseInt(profile.applicationSubmittedDate)).format(
              'MM/DD/YYYY'
            )}
          </DataThin>
        </DataBold>
        <DataBold>
          Name:{' '}
          <DataThin>
            {profile.firstName} {profile.lastName}
          </DataThin>
        </DataBold>
        <DataBold>
          Email: <DataThin>{profile.email}</DataThin>
        </DataBold>
        <DataBold>
          Phone: <DataThin>{profile.phone}</DataThin>
        </DataBold>
        <DataBold>
          Address:{' '}
          <DataThin>
            {profile.address} {profile.city}, {profile.state} {profile.zip}
          </DataThin>
        </DataBold>
        <DataBold>
          Parter Type:{' '}
          {profile.partnerType && (
            <DataThin>
              {helpers.mapPartnerTypeToLabel(profile.partnerType)}
            </DataThin>
          )}
        </DataBold>
        <DataBold>Attachments</DataBold>
        {/* <DataBold>
          W9:{' '}
          {profile.w9Doc && (
            <a href={profile.w9Doc.url} download>
              {profile.w9Doc.filename}
            </a>
          )}
        </DataBold>
       <DataBold>
          ACH Authorization Form:{' '}
          {profile.achDoc && (
            <a href={profile.achDoc.url} download>
              {profile.achDoc.filename}
            </a>
          )}
        </DataBold>
        <DataBold>
          Partner Agreement:{' '}
          {profile.parterAgreementDoc && (
            <a href={profile.parterAgreementDoc.url} download>
              {profile.parterAgreementDoc.filename}
            </a>
          )}
        </DataBold> */}
        <DataBold>Status:</DataBold>
        <DropdownStyleWrapper>
          <Select
            style={{width: 400}}
            value={profile.status}
            onChange={onChangeStatus}
          >
            <Option key="pending">Pending</Option>
            <Option key="approved">Approved</Option>
          </Select>
        </DropdownStyleWrapper>
        {profile && profile.customers && (
          <div style={{marginTop: 32}}>
            <CompaniesTable
              total={profile.customers.length}
              dataSource={profile.customers || []}
            />
          </div>
        )}
        {viewReports && <PartnerReportsTable partnerId={profile.id} />}
        {!viewReports && (
          <Button
            style={{width: 200, marginTop: 24}}
            secondary
            onClick={() => setViewReports(true)}
          >
            VIEW REPORTS
          </Button>
        )}
      </div>
    </>
  );
};
