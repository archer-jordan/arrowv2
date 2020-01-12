// TOP LEVEL IMPORTS
import React from 'react';
import styled from 'styled-components';

const getBackgroundColor = ({grey, disabled, secondary, theme, danger}) => {
  if (disabled) {
    return theme.colors.neutral8;
  }
  if (danger) {
    return theme.colors.red9;
  }
  if (grey) {
    return theme.colors.neutral10;
  }
  if (secondary) {
    return 'transparent';
  }

  return '#ed3245';
};

const getTextColor = ({grey, danger, disabled, secondary, theme}) => {
  if (disabled) {
    return theme.colors.neutral4;
  }
  if (danger) {
    return theme.colors.red3;
  }
  if (grey) {
    return theme.colors.neutral4;
  }
  if (secondary) {
    return '#bc2837';
  }
  return '#fff';
};

const getHoverBackgroundColor = ({
  grey,
  disabled,
  secondary,
  theme,
  danger,
}) => {
  if (disabled) {
    return theme.colors.neutral8;
  }
  if (danger) {
    return theme.colors.red9;
  }
  if (grey) {
    return theme.colors.neutral9;
  }
  if (secondary) {
    return 'transparent';
  }
  return '#bc2837';
};

const ButtonContainer = styled.button`
  width: ${p => {
    if (p.fullWidth) return '100%';
    if (p.style.width) return p.style.width;
    return '100%';
  }};
  height: 40px;
  border-radius: 35px;
  background-color: ${props => getBackgroundColor(props)};
  border: 0px;
  line-height: 40px;
  /* text-transform: uppercase; */
  letter-spacing: 0.025em;
  border: ${p => (p.secondary && !p.disabled ? '2px solid #bc2837' : null)};
  align-items: center;
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, width 0.3s ease, opacity 0.3s ease;
  :hover {
    cursor: pointer;
    background-color: ${props => getHoverBackgroundColor(props)};
  }
  :focus {
    outline: 0;
  }
`;

const ButtonText = styled.div`
  height: 17px;
  font-family: ${p => p.theme.fontFamily};
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: center;
  color: ${props => getTextColor(props)};
`;

const Button = props => (
  <ButtonContainer
    {...props}
    disabled={props.disabled}
    secondary={props.secondary}
    danger={props.danger}
    grey={props.grey}
  >
    <ButtonText
      disabled={props.disabled}
      secondary={props.secondary}
      danger={props.danger}
      grey={props.grey}
    >
      {props.children}
    </ButtonText>
  </ButtonContainer>
);

Button.defaultProps = {
  fullWidth: true,
  disabled: false,
  type: 'button',
  style: {
    minWidth: 122,
  },
};

export default Button;