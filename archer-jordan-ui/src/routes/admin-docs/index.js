import React, {useState} from 'react';
import styled from 'styled-components';
import {debounce} from 'lodash';
// COMPONENTS
import EmptyState from 'components/common/EmptyState';
import Icon from 'components/common/Icon';
import message from 'components/common/message';
import FileRow from 'components/common/FileRow';
// APOLLO
import DELETE_ADMIN_DOC from 'ApolloClient/Mutations/deleteAdminDoc';
import UPLOAD_ADMIN_DOC from 'ApolloClient/Mutations/uploadAdminDoc';
import ADMIN_DOCS from 'ApolloClient/Queries/adminDocs';
import {useMutation, useQuery} from 'react-apollo';

const Container = styled.div`
  width: 1100px;
  margin: auto;
  max-width: 100%;
  margin-top: 40px;
`;

const SearchInput = styled.input`
  border-radius: 25px;
  background: ${(p) => p.theme.colors.neutral10};
  border: 0px;
  height: 48px;
  min-width: 300px;
  padding-left: 16px;
  &:focus {
    outline: 0;
  }
`;

const ListContainer = styled.div`
  margin-top: 32px;
  width: 1250px;
  max-width: 100%;
`;

const ActionsContainer = styled.div`
  display: flex;
  position: relative;
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

const UploadingOverlay = styled.div`
  z-index: 1000;
  background: rgba(0, 0, 0, 0.45);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => {
  const [searchText, setSearchText] = useState(undefined);
  const [finalSearchText, setFinalSearchText] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [uploadAdminDoc] = useMutation(UPLOAD_ADMIN_DOC);
  const [deleteAdminDoc] = useMutation(DELETE_ADMIN_DOC);
  const {data, loading, error} = useQuery(ADMIN_DOCS, {
    variables: {
      searchText: finalSearchText,
    },
    pollInterval: 100000,
  });

  const handleUpload = async (e) => {
    try {
      if (uploading) return null;
      setUploading(true);
      await uploadAdminDoc({
        variables: {
          file: e.target.files[0],
        },
        refetchQueries: [
          {
            query: ADMIN_DOCS,
            variables: {
              searchText: finalSearchText,
            },
          },
        ],
      });
      setUploading(false);
      message.success('Your file was successfully uploaded!');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFile = async (id) => {
    try {
      let res = await deleteAdminDoc({
        variables: {
          id,
        },
        refetchQueries: [
          {
            query: ADMIN_DOCS,
            variables: {
              searchText: finalSearchText,
            },
          },
        ],
      });
      if (res.data.deleteAdminDoc.success) {
        message.warning('Your file was successfully deleted!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const docs = data && data.adminDocs;

  const debounceSearch = debounce((searchText) => {
    setFinalSearchText(searchText);
  }, 250);

  return (
    <Container>
      {/* If we're uploading, cover the screen with an loading/uploading overlay */}
      {uploading && (
        <UploadingOverlay>
          <Icon type="loading" style={{fontSize: 24, color: '#fff'}} />
        </UploadingOverlay>
      )}
      {/* Row holding search, filters, upload button */}
      <ActionsContainer>
        <div style={{marginRight: 24}}>
          <SearchInput
            placeholder="Search docs"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              debounceSearch(e.target.value);
            }}
          />
        </div>
        <div style={{marginTop: 12}}>Filters go here</div>
        <div style={{position: 'absolute', right: 0}}>
          <UploadButton
            name="compay-upload"
            type="file"
            id="compay-upload"
            onChange={handleUpload}
          />
          <Label htmlFor="compay-upload">+ Upload New File</Label>
        </div>
      </ActionsContainer>
      {/* Our actual list of uploads */}
      <ListContainer>
        {loading && (
          <Icon type="loading" style={{fontSize: 24, color: '#000'}} />
        )}
        {!loading && error && 'There was an error'}
        {!loading && docs && docs.length > 0 && (
          <>
            {docs.map((doc) => {
              return (
                <FileRow
                  key={doc.id}
                  filename={doc.filename}
                  url={doc.url}
                  onDelete={() => handleDeleteFile(doc.id)}
                />
              );
            })}
          </>
        )}
        {/* empty state for when a search returns no results */}
        {!loading && docs && docs.length === 0 && searchText && (
          <>
            <EmptyState
              title="No results..."
              subtitle={`We can't find any docs that match your search`}
            />
          </>
        )}
        {/* empty state for when there are no results at all */}
        {!loading && docs && docs.length === 0 && !searchText && (
          <>
            <EmptyState
              title="No documents yet..."
              subtitle={`Click "Upload New File" to add your first document`}
            />
          </>
        )}
      </ListContainer>
    </Container>
  );
};
