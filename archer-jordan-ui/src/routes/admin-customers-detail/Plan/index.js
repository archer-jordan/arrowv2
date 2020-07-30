import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import Icon from 'components/common/Icon';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Popconfirm from 'components/common/Popconfirm';
// APOLLO
import {graphql, Query} from 'react-apollo';
import saveAttachment from 'ApolloClient/Mutations/saveAttachment';
import singleUpload from 'ApolloClient/Mutations/singleUpload';
import deleteAttachment from 'ApolloClient/Mutations/deleteAttachment';
import getAttachments from 'ApolloClient/Queries/getAttachments';

import compose from 'lodash/flowRight';

const SectionTitle = styled.div`
  color: #fff;
  padding: 8px 16px;
  border-radius: 25px;
  margin-bottom: 24px;
  background: ${(p) => p.theme.colors.primary1};
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
  padding: 6px 10px;
  border-radius: 25px;
  border: 2px solid ${(p) => p.theme.colors.support2};
  background: transparent;
  display: inline-block;
  cursor: pointer;
  &:hover {
    border: 2px solid ${(p) => p.theme.colors.support1};
    color: ${(p) => p.theme.colors.support1};
  }
`;

const Filename = styled.div`
  font-size: 18px;
`;

const ButtonText = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: right;
  color: ${(p) => p.theme.colors.support1};
  cursor: pointer;
`;

const DownloadText = styled.a`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: right;
  color: ${(p) => p.theme.colors.support1};
  cursor: pointer;
`;

const FileRow = ({filename, url, onDelete}) => (
  <Row style={{width: '90%', margin: 'auto'}}>
    <Col xs={16}>
      <Filename>{filename}</Filename>
    </Col>
    <Col xs={4}>
      <DownloadText href={url} download={filename}>
        Download
      </DownloadText>
    </Col>
    <Col xs={4}>
      {' '}
      <Popconfirm
        title="Are you sure you want to delete this?"
        onConfirm={onDelete}
      >
        <ButtonText>Delete</ButtonText>{' '}
      </Popconfirm>
    </Col>
  </Row>
);

class Plan extends React.PureComponent {
  state = {
    loading: false,
  };
  onUpload = async (event, type) => {
    try {
      this.setState({
        loading: true,
      });
      let file = event.target.files[0];
      // upload file to s3
      let uploadResult = await this.props.singleUpload({
        variables: {
          file,
        },
      });

      if (uploadResult.data.singleUpload) {
        const {filename, mimetype, url, key} = uploadResult.data.singleUpload;
        await this.props.saveAttachment({
          variables: {
            params: {
              filename,
              mimetype,
              url,
              key,
              customerId: this.props.customer.id,
              type,
            },
          },
          refetchQueries: [
            {
              query: getAttachments,
              variables: {
                customerId: this.props.customer.id,
                type,
              },
            },
          ],
        });
        this.setState({
          loading: false,
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
      });
      console.log(err);
    }
  };
  onDelete = async (id, type) => {
    try {
      await this.props.deleteAttachment({
        variables: {
          id,
        },
        refetchQueries: [
          {
            query: getAttachments,
            variables: {
              customerId: this.props.customer.id,
              type,
            },
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div>
        <SectionTitle>
          FOR COMPANY ADMINS{' '}
          <span style={{fontWeight: 300, marginLeft: 4}}>
            (viewable only by company admins)
          </span>
        </SectionTitle>
        {!this.state.loading ? (
          <div style={{marginBottom: 24, marginLeft: 48}}>
            <UploadButton
              name="compay-upload"
              type="file"
              id="compay-upload"
              onChange={(e) => this.onUpload(e, 'CompanyAdminDoc')}
            />
            <Label htmlFor="compay-upload">Upload Plan</Label>
          </div>
        ) : (
          <Icon type="loading" />
        )}
        <Query
          query={getAttachments}
          pollInterval={600000} // every ten minutes
          variables={{
            customerId: this.props.customer.id,
            type: 'CompanyAdminDoc',
          }}
        >
          {({data, loading, error}) => {
            if (loading) return <Icon type="loading" />;
            if (error) return 'error';
            if (data.getAttachments && data.getAttachments.length === 0) {
              return null;
            }
            return data.getAttachments.map((file) => {
              return (
                <div style={{marginTop: 8}} key={file.id}>
                  <FileRow
                    filename={file.filename}
                    url={file.url}
                    onDelete={() => this.onDelete(file.id, 'CompanyAdminDoc')}
                  />
                </div>
              );
            });
          }}
        </Query>

        <SectionTitle style={{marginTop: 48}}>
          FOR EMPLOYEES{' '}
          <span style={{fontWeight: 300, marginLeft: 4}}>
            (viewable by employees AND company admins)
          </span>
        </SectionTitle>
        {!this.state.loading ? (
          <div style={{marginBottom: 24, marginLeft: 48}}>
            <UploadButton
              name="employee-upload"
              type="file"
              id="employee-upload"
              onChange={(e) => this.onUpload(e, 'EmployeeDoc')}
            />
            <Label htmlFor="employee-upload">Upload Plan</Label>
          </div>
        ) : (
          <Icon type="loading" />
        )}
        <Query
          query={getAttachments}
          pollInterval={600000} // every ten minutes
          variables={{customerId: this.props.customer.id, type: 'EmployeeDoc'}}
        >
          {({data, loading, error}) => {
            if (loading) return <Icon type="loading" />;
            if (error) return 'error';
            if (data.getAttachments && data.getAttachments.length === 0) {
              return null;
            }
            return data.getAttachments.map((file) => {
              return (
                <div style={{marginTop: 8}} key={file.id}>
                  <FileRow
                    filename={file.filename}
                    url={file.url}
                    onDelete={() => this.onDelete(file.id, 'EmployeeDoc')}
                  />
                </div>
              );
            });
          }}
        </Query>
      </div>
    );
  }
}

export default compose(
  graphql(saveAttachment, {name: 'saveAttachment'}),
  graphql(singleUpload, {name: 'singleUpload'}),
  graphql(deleteAttachment, {name: 'deleteAttachment'})
)(Plan);
