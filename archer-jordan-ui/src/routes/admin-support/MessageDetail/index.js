import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import ButtonBack from 'components/common/ButtonBack';

const DataBold = styled.h3`
  font-weight: 900;
  font-size: 18px;
  margin-bottom: 4px;
`;

const DataThin = styled.span`
  font-weight: 400;
  font-size: 18px;
`;

export default ({supportMessage, goBack}) => {
  return (
    <>
      <ButtonBack onClick={goBack} />
      <div style={{paddingTop: 32}}>
        <DataBold>
          ID: <DataThin>{supportMessage.id}</DataThin>
        </DataBold>
        <DataBold>
          Customer:{' '}
          <DataThin>
            {supportMessage.customer && supportMessage.customer.title}
          </DataThin>
        </DataBold>
        <DataBold>
          Email: <DataThin>{supportMessage.email}</DataThin>
        </DataBold>
        <DataBold>
          Issue Type: <DataThin>{supportMessage.messageType}</DataThin>
        </DataBold>
        <DataBold>
          Status: <DataThin>{supportMessage.status}</DataThin>
        </DataBold>
        <DataBold>
          Subject: <DataThin>{supportMessage.subject}</DataThin>
        </DataBold>
        <DataBold>
          Message: <DataThin>{supportMessage.message}</DataThin>
        </DataBold>
      </div>
    </>
  );
};
