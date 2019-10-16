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
    return theme.colors.primary10;
  }

  return '#ed3245';
};

const getTextColor = ({danger, grey, disabled, secondary, theme}) => {
  if (disabled) {
    return theme.colors.neutral5;
  }
  if (danger) {
    return theme.colors.red3;
  }
  if (grey) {
    return theme.colors.neutral4;
  }
  if (secondary) {
    return theme.colors.primary1;
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
    return theme.colors.primary9;
  }
  return '#bc2837';
};

const ButtonContainer = styled.button`
  width: ${p => {
    if (p.fullWidth) return '100%';
    if (p.style.width) return p.style.width;
    return '100%';
  }};
  height: 36px;
  border-radius: 35px;
  background-color: ${props => getBackgroundColor(props)};
  border: 0px;
  line-height: 40px;
  /* text-transform: uppercase; */
  letter-spacing: 0.025em;
  align-items: center;
  /* box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); */
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
