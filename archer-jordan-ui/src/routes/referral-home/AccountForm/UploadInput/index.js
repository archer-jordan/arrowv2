import React, {useState} from 'react';
import styled from 'styled-components';
//COMPONENTS
import message from 'components/common/message';
// APOLLO
import {useMutation} from 'react-apollo';
import SINGLE_UPLOAD from 'ApolloClient/Mutations/singleUpload';

const UploadLabel = styled.label`
  font-weight: 900;
  font-size: 18px;
  margin-right: 8px;
`;

const UploadValue = styled.a`
  font-weight: 700;
  font-size: 16px;
`;

const TemplateDL = styled.a`
  font-weight: 700;
  font-size: 16px;
  text-decoration: underline !important;
  margin-left: 16px;
  /* color: ${(p) => p.theme.colors.neutral7} !important; */
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
  color: ${(p) => p.theme.colors.primary4};
  border-radius: 25px;
  text-decoration: underline;
  background: transparent;
  display: inline-block;
  cursor: pointer;
`;

export default ({label = 'W9', templateUrl, file, onChange}) => {
  const [singleUpload] = useMutation(SINGLE_UPLOAD);
  const [uploading, setUploading] = useState(false);

  const onNewUpload = async (e) => {
    try {
      let file = e.target.files && e.target.files[0];
      setUploading(true);
      let res = await singleUpload({
        variables: {
          file,
        },
      });
      onChange(res.data.singleUpload);
      message.success('Upload successful');
      setUploading(false);
    } catch (err) {
      setUploading(false);
      console.log(err);
    }
  };

  return (
    <div
      style={{display: 'flex', alignItems: 'center', height: 64, marginTop: 16}}
    >
      <div>
        <div style={{maginBottom: 16}}>
          <UploadLabel>{label}:</UploadLabel>
          {file && file.filename ? (
            <UploadValue>{file.filename}</UploadValue>
          ) : (
            <span>No file selected</span>
          )}
        </div>
        <span>
          <UploadButton
            name={label}
            type="file"
            disabled={uploading}
            id={label}
            onChange={onNewUpload}
          />
          <Label htmlFor={label}>
            {!uploading ? 'UPLOAD NEW' : 'UPLOADING...'}
          </Label>
        </span>
        {templateUrl && (
          <TemplateDL target="_blank" download href={templateUrl}>
            DOWNLOAD TEMPLATE
          </TemplateDL>
        )}
      </div>
    </div>
  );
};
