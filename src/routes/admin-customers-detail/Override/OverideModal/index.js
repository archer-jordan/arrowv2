import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import formatRow from '../formatRow';
// COMPONENTS
import Icon from 'components/common/Icon';
import Filename from '../Filename';
import Button from 'components/common/Button';
import ErrorBlock from 'components/common/ErrorBlock';
import Modal from 'components/common/Modal';
import Title from 'components/text/Title';
import Caption from 'components/text/Caption';
import Alert from 'components/common/Alert';
// APOLLO
import {graphql} from 'react-apollo';
import client from 'ApolloClient/index.js';
import customerReportQuery from 'ApolloClient/Queries/customerReport';
import customerTotalsUpload from 'ApolloClient/Mutations/customerTotalsUpload';
import customerReportsByCustomerId from 'ApolloClient/Queries/customerReportsByCustomerId';
import compose from 'lodash/flowRight';

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
  color: ${p => p.theme.colors.support2};
  padding: 6px 10px;
  border-radius: 25px;
  border: 2px solid ${p => p.theme.colors.support2};
  background: transparent;
  display: inline-block;
  cursor: pointer;
  &:hover {
    border: 2px solid ${p => p.theme.colors.support1};
    color: ${p => p.theme.colors.support1};
  }
`;

const SectionTitle = styled.div`
  color: #fff;
  padding: 8px 16px;
  border-radius: 25px;
  margin-bottom: 24px;
  background: ${p => p.theme.colors.primary1};
`;

class OverrideModal extends React.PureComponent {
  render() {
    return (
      <Modal visible={this.props.visible} footer={null}>
        {this.props.content}
        <div style={{display: 'flex', marginTop: 20}}>
          {' '}
          <div style={{flex: 1}}></div>
          <div style={{flex: 1}}>
            {' '}
            <Button
              style={{width: 100}}
              secondary
              onClick={this.props.onCancel}
            >
              cancel
            </Button>
            <Button
              style={{width: 100, marginLeft: 16}}
              onClick={this.props.onUpdate}
            >
              Yes, update
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default OverrideModal;
