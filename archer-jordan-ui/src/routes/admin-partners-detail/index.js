import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import moment from 'moment';
// COMPONENTS
import Loading from 'components/common/Loading';
import Tabs from 'components/common/Tabs';
import Icon from 'components/common/Icon';
import message from 'components/common/message';
import FileRow from 'components/common/FileRow';
import PartnerReportsTable from 'components/common/PartnerReportsTable';
import CompaniesTable from './CompaniesTable';
import Select from 'components/inputs/SelectInput';
import DropdownStyleWrapper from 'components/inputs/DropdownStyleWrapper';
// APOLLO
import {useQuery, useMutation} from 'react-apollo';
import REFERRAL_PARTNER_BY_ID from 'ApolloClient/Queries/referralPartnerById';
import SINGLE_UPLOAD from 'ApolloClient/Mutations/singleUpload';
import SAVE_REFERRAL_PARTNER from 'ApolloClient/Mutations/saveReferralPartner';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

const {Option} = Select;
const {TabPane} = Tabs;

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

const UploadButton = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${(p) => p.theme.colors.support2};
  padding: 0px;
  border-radius: 25px;
  background: transparent;
  display: inline-block;
  cursor: pointer;
  &:hover {
    color: ${(p) => p.theme.colors.support1};
  }
`;

export default ({match}) => {
  const [viewReports, setViewReports] = useState(null); //
  const [saving, setSaving] = useState(false);
  const [saveReferralPartner] = useMutation(SAVE_REFERRAL_PARTNER);
  const [singleUpload] = useMutation(SINGLE_UPLOAD);
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
      message.success('Changes saved');
      setSaving(false);
    } catch (err) {
      setSaving(false);
      console.log(err);
    }
  };

  // const onUploadAttachment = () => {
  //   try {
  //     setSaving(true);
  //     await saveReferralPartner({
  //       variables: {
  //         id: match.params.id,
  //         params: {
  //           attachments: [],
  //         },
  //       },
  //       refetchQueries: [
  //         {
  //           query: REFERRAL_PARTNER_BY_ID,
  //           variables: {
  //             id: match.params.id,
  //           },
  //         },
  //       ],
  //     });
  //     setSaving(false);
  //   } catch (err) {
  //     setSaving(false);
  //     console.log(err);
  //   }
  // };

  const onUploadAttachment = async (event) => {
    try {
      setSaving(true);
      let file = event.target.files[0];
      // upload file to s3
      let uploadResult = await singleUpload({
        variables: {
          file,
        },
      });

      if (uploadResult.data.singleUpload) {
        let newAttachment = {
          ...uploadResult.data.singleUpload,
        };

        delete newAttachment.__typname;
        // update the referral partner profile with the new attachment

        let newAttachments = [...profile.attachments, newAttachment];

        await saveReferralPartner({
          variables: {
            id: match.params.id,
            params: {
              attachments: newAttachments.map(
                ({filename, mimetype, encoding, url, key}) => ({
                  filename,
                  mimetype,
                  encoding,
                  url,
                  key,
                })
              ),
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
        message.success('Attachment successfully added');
      }

      setSaving(false);
    } catch (err) {
      setSaving(false);
      console.log(err);
    }
  };

  const onRemoveAttachment = async (idToRemove) => {
    try {
      setSaving(true);
      await saveReferralPartner({
        variables: {
          id: match.params.id,
          params: {
            attachments: profile.attachments
              .filter((item) => item.id !== idToRemove) // remove the field we want to remove
              .map(({filename, mimetype, encoding, url, key}) => ({
                // remove id, __typename, etc so that mutation doesn't spit back at you
                filename,
                mimetype,
                encoding,
                url,
                key,
              })),
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
      message.success('Attachment successfully removed');
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
      <div style={{marginBottom: 32}}>
        <BackLink to={`/admin/partners`}>
          <Icon type="arrow-left" style={{fontSize: 14, marginRight: 4}} />
          Back to Partners
        </BackLink>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Partner Details" key="1">
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
            <DataBold style={{marginTop: 16}}>Attachments:</DataBold>
            {profile.attachments &&
              profile.attachments.length > 0 &&
              profile.attachments.map((attachment) => (
                <FileRow
                  key={attachment.id}
                  filename={attachment.filename}
                  url={attachment.url}
                  onDelete={() => onRemoveAttachment(attachment.id)}
                />
              ))}
            <div style={{marginTop: 16, marginBottom: 32}}>
              <UploadButton
                onChange={onUploadAttachment}
                name="parter-file"
                type="file"
                id="parter-file"
              />{' '}
              <Label htmlFor="parter-file">+ Add Attachment</Label>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Companies" key="2">
          <div style={{marginTop: 32}}>
            <CompaniesTable
              total={profile.customers.length}
              dataSource={profile.customers || []}
            />
          </div>
        </TabPane>
        <TabPane tab="Reports" key="3">
          <PartnerReportsTable partnerId={profile.id} />
        </TabPane>
      </Tabs>

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

      {/* {!viewReports && (
          <Button
            style={{width: 200, marginTop: 24}}
            secondary
            onClick={() => setViewReports(true)}
          >
            VIEW REPORTS
          </Button>
        )} */}
    </>
  );
};
