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

class BenefitsGuide extends React.PureComponent {
  render() {
    return (
      <div>
        <Query
          query={getAttachment}
          variables={{
            customerId: this.props.currentUser.customerId,
            type: 'EmployeePlan',
          }}
        >
          {({data, loading, error}) => {
            if (loading) return <Icon type="loading" />;
            if (error) return 'error';
            if (!data.getAttachment || !data.getAttachment.url) {
              return 'No benefits guide yet...';
            }
            return (
              <DownloadText
                href={data.getAttachment.url}
                download={data.getAttachment.filename}
                style={{width: 160}}
              >
                Download Benefits Guide
              </DownloadText>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default BenefitsGuide;
