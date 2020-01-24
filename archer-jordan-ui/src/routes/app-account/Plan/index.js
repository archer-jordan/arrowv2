import React from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';
// APOLLO
import {Query} from 'react-apollo';
import getAttachment from 'ApolloClient/Queries/getAttachment';

const DownloadText = styled.a`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: right;
  background: ${p => p.theme.colors.support2};
  padding: 12px 24px;
  border-radius: 25px;
  color: #fff !important;
  cursor: pointer;
  &:hover {
    background: ${p => p.theme.colors.support1};
  }
`;

class Plan extends React.PureComponent {
  render() {
    const {currentUser} = this.props;
    return (
      <div>
        {/* We show this one if current user is a company admin */}
        {currentUser &&
          currentUser.roles &&
          (currentUser.roles.includes('coAdmin') ||
            currentUser.roles.includes('superAdmin')) && (
            <Query
              query={getAttachment}
              variables={{
                customerId: this.props.currentUser.customerId,
                type: 'CustomerPlan',
              }}
            >
              {({data, loading, error}) => {
                if (loading) return <Icon type="loading" />;
                if (error) return 'error';
                if (!data.getAttachment || !data.getAttachment.url) {
                  return 'No plan attached yet...';
                }

                return (
                  <DownloadText
                    href={data.getAttachment.url}
                    download={data.getAttachment.filename}
                    style={{width: 160}}
                  >
                    Download plan pdf
                  </DownloadText>
                );
              }}
            </Query>
          )}
      </div>
    );
  }
}

export default Plan;
