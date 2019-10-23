import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .group {
    position: relative;
    margin-bottom: 32px;
  }

  input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: ${p => (p.width ? p.width : '246px')};
    border: none;
    border-radius: 0px;
    color: ${p => (p.dark ? p.theme.colors.primary3 : '#fff')};
    max-width: 100%;
    border-bottom: 2px solid #8cb3cd;
  }

  input:focus {
    outline: none;
  }

  /* LABEL ======================================= */
  label {
    color: #8cb3cd;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  /* active state */
  input:focus ~ label,
  input:valid ~ label {
    top: -20px;
    font-size: 14px;
    color: ${p => (p.dark ? p.theme.colors.primary2 : '#fff')};
  }

  /* BOTTOM BARS ================================= */
  .bar {
    position: relative;
    display: block;
    width: ${p => (p.width ? p.width : '246px')};
  }
  .bar:before,
  .bar:after {
    content: '';
    height: 3px;
    width: 0;
    bottom: 0px;
    max-width: 100%;
    position: absolute;
    background: ${p => (p.dark ? p.theme.colors.primary3 : '#fff')};
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  .bar:before {
    left: 50%;
  }
  .bar:after {
    right: 50%;
  }

  /* active state */
  input:focus ~ .bar:before,
  input:focus ~ .bar:after {
    width: 50%;
  }

  /* HIGHLIGHTER ================================== */
  .highlight {
    position: absolute;
    height: 60%;
    width: 120px;
    top: 25%;
    max-width: 100%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }
  input {
    background: transparent;
  }
  input[type='text'] {
    background: transparent;
  }
  input[type='password'] {
    background: transparent;
  }

  /* active state */
  input:focus ~ .highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    -moz-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
  }

  /* ANIMATIONS ================ */
  @-webkit-keyframes inputHighlighter {
    from {
      background: #5264ae;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
  @-moz-keyframes inputHighlighter {
    from {
      background: #5264ae;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
  @keyframes inputHighlighter {
    from {
      background: #5264ae;
    }
    to {
      width: 0;
      background: transparent;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-animation: autofill 0s forwards;
    animation: autofill 0s forwards;
    -webkit-text-fill-color: #fff !important;
  }

  @keyframes autofill {
    100% {
      background: transparent;
      color: #fff !important;
    }
  }

  @-webkit-keyframes autofill {
    100% {
      background: transparent;
      color: #fff !important;
    }
  }
`;

const Input = ({type, label, dark, width, onChange}) => (
  <Wrapper dark={dark} width={width}>
    <div className="group">
      <input type={type || 'text'} required width={width} onChange={onChange} />
      {/* <span className="highlight"></span> */}
      <span className="bar"></span>
      <label>{label}</label>
    </div>
  </Wrapper>
);

export default Input;
