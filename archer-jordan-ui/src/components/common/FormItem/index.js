import styled from 'styled-components';
import React from 'react';
import FormLabel from './FormLabel';
import HintText from './HintText';

const Container = styled.div`
  margin-top: 22px;
`;

const Required = styled.span`
  color: ${p => p.theme.colors.red4};
  font-size: 18px;
  position: relative;
  top: 4px;
  right: -3px;
  line-height: 10px;
`;

const ErrorText = styled(HintText)`
  color: ${p => p.theme.colors.red5};
`;

class FormItem extends React.PureComponent {
  render() {
    const {
      label,
      colon,
      hint,
      error,
      children,
      containerProps,
      required,
    } = this.props;
    return (
      <Container {...containerProps}>
        {label && (
          <FormLabel>
            {label}
            {colon ? ':' : null}
            {required ? <Required>*</Required> : null}
          </FormLabel>
        )}
        {children}
        {hint && <HintText>{hint}</HintText>}
        {error && <ErrorText>{error}</ErrorText>}
      </Container>
    );
  }
}

FormItem.defaultProps = {
  label: null,
  containerProps: {},
  colon: false,
  required: false,
};

export default FormItem;
