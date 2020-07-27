import React from 'react';
import styled from 'styled-components';
// APOLLO
import {Query} from 'react-apollo';
import getCustomerAttachments from 'ApolloClient/Queries/getCustomerAttachments';

const DownloadText = styled.a`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  display: block;
  letter-spacing: 1px;
  color: ${(p) => p.theme.colors.support2};
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  &:hover {
    color: ${(p) => p.theme.colors.support1};
  }
`;

export default ({currentUser}) => {
  if (!currentUser || !currentUser.roles) {
    return null;
  }

  return (
    <div>
      <div>
        {/* <div>Employee Docs</div> */}
        <Query query={getCustomerAttachments} variables={{type: 'EmployeeDoc'}}>
          {({data, loading, error}) => {
            if (loading) return null;
            if (error) return null;
            if (
              !data.getCustomerAttachments ||
              data.getCustomerAttachments.length === 0
            ) {
              return null;
            }

            return data.getCustomerAttachments.map((file) => {
              return (
                <DownloadText href={file.url} download={file.filename}>
                  {file.filename}
                </DownloadText>
              );
            });
          }}
        </Query>
      </div>
      <div>
        {currentUser.roles.includes('coAdmin') ||
          (currentUser.roles.includes('superAdmin') && (
            <>
              {/* <div>Admin Docs</div> */}
              <Query
                query={getCustomerAttachments}
                variables={{type: 'CompanyAdminDoc'}}
              >
                {({data, loading, error}) => {
                  if (loading) return null;
                  if (error) return null;
                  if (
                    !data.getCustomerAttachments ||
                    data.getCustomerAttachments.length === 0
                  ) {
                    return null;
                  }
                  return data.getCustomerAttachments.map((file) => {
                    return (
                      <DownloadText href={file.url} download={file.filename}>
                        {file.filename}
                      </DownloadText>
                    );
                  });
                }}
              </Query>
            </>
          ))}
      </div>
    </div>
  );
};
