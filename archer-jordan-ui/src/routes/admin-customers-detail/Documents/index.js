import React from 'react';
import styled from 'styled-components';
import {debounce} from 'lodash';
// COMPONENTS
import Icon from 'components/common/Icon';
import EmptyState from 'components/common/EmptyState';
import FileRow from 'components/common/FileRow';
import MultiSelectInput from 'components/inputs/MultiSelectInput';
// APOLLO
import {graphql, Query} from 'react-apollo';
import saveAttachment from 'ApolloClient/Mutations/saveAttachment';
import singleUpload from 'ApolloClient/Mutations/singleUpload';
import deleteAttachment from 'ApolloClient/Mutations/deleteAttachment';
import getAttachments from 'ApolloClient/Queries/getAttachments';

import compose from 'lodash/flowRight';

const UploadButton = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const ActionsContainer = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 32px;
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

const SearchInput = styled.input`
  border-radius: 25px;
  /* background: ${(p) => p.theme.colors.neutral10}; */
  background: #eae8e3;
  border: 0px;
  height: 48px;
  min-width: 300px;
  padding-left: 16px;
  &:focus {
    outline: 0;
  }
`;

class Documents extends React.PureComponent {
  state = {
    loading: false,
    searchText: '',
    finalSearchText: undefined,
    sortBy: 'ascCreatedAt',
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
              searchText: this.state.finalSearchText,
            },
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };
  debounceSearch = debounce((searchText) => {
    this.setState({finalSearchText: searchText});
  }, 250);
  render() {
    let variables = {
      customerId: this.props.customer.id,
      type: 'CustomerUpload',
      searchText: this.state.finalSearchText,
      sortBy: this.state.sortBy,
    };
    return (
      <div>
        <ActionsContainer>
          <div style={{marginRight: 24}}>
            <SearchInput
              placeholder="Search docs"
              value={this.state.searchText}
              onChange={(e) => {
                this.setState({searchText: e.target.value});
                this.debounceSearch(e.target.value);
              }}
            />
          </div>
          <div style={{width: 150}}>
            {' '}
            <MultiSelectInput
              options={[
                {
                  label: 'Newest',
                  id: 'ascCreatedAt',
                },
                {
                  label: 'Oldest',
                  id: 'descCreatedAt',
                },
                {
                  label: 'By Filename',
                  id: 'ascFilename',
                },
              ]}
              value={this.state.sortBy}
              onChange={(sortBy) => this.setState({sortBy})}
            />
          </div>
          <div style={{position: 'absolute', right: 0}}>
            {!this.state.loading ? (
              <>
                <UploadButton
                  name="compay-upload"
                  type="file"
                  id="compay-upload"
                  onChange={(e) => this.onUpload(e, 'CustomerUpload')}
                />
                <Label htmlFor="compay-upload">Upload New File</Label>
              </>
            ) : (
              <Icon type="loading" />
            )}
          </div>
        </ActionsContainer>
        {console.log({variables})}
        <Query
          query={getAttachments}
          //pollInterval={600000} // every ten minutes
          variables={variables}
        >
          {({data, loading, error}) => {
            if (loading) return <Icon type="loading" />;
            if (error) return 'error';
            const docs = data && data.getAttachments;
            return (
              <React.Fragment>
                {docs &&
                  docs.length > 0 &&
                  docs.map((file) => {
                    return (
                      <FileRow
                        key={file.id}
                        filename={file.filename}
                        url={file.url}
                        onDelete={() =>
                          this.onDelete(file.id, 'CustomerUpload')
                        }
                      />
                    );
                  })}
                {!loading &&
                  docs &&
                  docs.length === 0 &&
                  this.state.searchText && (
                    <>
                      <EmptyState
                        title="No results..."
                        subtitle={`We can't find any docs that match your search`}
                      />
                    </>
                  )}
                {!loading &&
                  docs &&
                  docs.length === 0 &&
                  !this.state.searchText && (
                    <>
                      <EmptyState
                        title="No documents yet..."
                        subtitle={`Click "Upload New File" to add your first document`}
                      />
                    </>
                  )}
              </React.Fragment>
            );
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
)(Documents);
