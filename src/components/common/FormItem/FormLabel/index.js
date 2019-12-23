import styled from 'styled-components';

const FormLabel = styled.label`
  font-family: ${p => p.theme.fontFamily};
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0px;
  color: ${p => p.theme.colors.neutral4};
  display: block;
  margin-bottom: 3px;
`;

FormLabel.defaultProps = {
  style: {},
  size: null,
};

export default FormLabel;
