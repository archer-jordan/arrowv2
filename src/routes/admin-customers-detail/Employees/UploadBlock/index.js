import React from 'react';
import styled from 'styled-components';
import ErrorBlock from 'components/common/ErrorBlock';
import theme from 'lib/theme';
import Icon from 'components/common/Icon';

const SectionTitle = styled.div`
  color: #fff;
  padding: 8px 16px;
  border-radius: 25px;
  margin-bottom: 24px;
  background: ${p => p.theme.colors.primary1};
  margin-top: 48px;
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

class UploadBlock extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <SectionTitle>{this.props.sectionTitle}</SectionTitle>
        {!this.props.loading ? (
          <div>
            <UploadButton
              name={this.props.name}
              type="file"
              id={this.props.name}
              disabled={this.props.loading}
              onChange={this.props.onChange}
            />{' '}
            <Label for={this.props.name}>{this.props.buttonText}</Label>
          </div>
        ) : (
          <Icon
            type="loading"
            style={{fontSize: 20, color: theme.colors.primary1}}
          />
        )}

        {this.props.errors && this.props.errors.length > 0 && (
          <div style={{marginTop: 16, maxWidth: '100%', width: 600}}>
            {this.props.errors.map(error => (
              <ErrorBlock key={error} error={error} />
            ))}
          </div>
        )}
      </React.Fragment>
    );
  }
}

UploadBlock.defaultProps = {
  name: 'file',
  errors: [],
  loading: false,
  onChange: () => {},
};

export default UploadBlock;
