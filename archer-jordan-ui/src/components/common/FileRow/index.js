import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Popconfirm from 'components/common/Popconfirm';

const Filename = styled.div`
  font-size: 18px;
`;

const ButtonText = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: right;
  color: ${(p) => p.theme.colors.neutral8};
  cursor: pointer;
  &:hover {
    color: ${(p) => p.theme.colors.neutral7};
  }
`;

const DownloadText = styled.a`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: right;
  color: ${(p) => p.theme.colors.support3};
  &:hover {
    color: ${(p) => p.theme.colors.support1};
  }
  cursor: pointer;
`;

const MAX_STRING_LENGTH = 50;

export default ({filename, url, onDelete}) => (
  <Row
    style={{
      width: '80%',
      marginTop: 16,
      height: 40,
      borderBottom: '1px solid #efefef',
    }}
  >
    <Col xs={16}>
      <Filename>
        {filename.length > MAX_STRING_LENGTH
          ? `${filename.substring(0, MAX_STRING_LENGTH)}...`
          : filename}
      </Filename>
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
