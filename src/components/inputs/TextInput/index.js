import React from 'react';

const Input = ({type, label}) => (
  <div className="group">
    <input type={type || 'text'} required />
    <span className="highlight"></span>
    <span className="bar"></span>
    <label>{label}</label>
  </div>
);

export default Input;
