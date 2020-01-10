// TOP LEVEL IMPORTS
import React from 'react';
import PropTypes from 'prop-types';
// ANTD
import Input from 'antd/lib/input';
import styled from 'styled-components';

const Wrapper = styled.div`
  textarea {
    background: #ebf2f7 !important;
    border: 0px !important;
  }
  textarea::placeholder {
    color: #a6c9dc !important;
  }
`;

const {TextArea} = Input;

// EXPORTED COMPONENT
// ===================================
export class TextAreaInput extends React.Component {
  render() {
    return (
      <Wrapper>
        <TextArea
          {...this.props}
          onChange={e => this.props.onChange(e.target.value)}
        />
      </Wrapper>
    );
  }
}

// PROPS
// ===================================
TextAreaInput.propTypes = {
  size: PropTypes.string,
  style: PropTypes.object,
};

// Specifies the default values for props:
TextAreaInput.defaultProps = {
  size: 'large',
  onChange: () => console.log('no onchange passed to TextAreaInput'),
  style: {
    width: '100%',
    minWidth: '170px',
    maxWith: '100%',
  },
};

// EXPORT
// ===================================
export default TextAreaInput;
