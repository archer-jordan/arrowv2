import styled from 'styled-components';
import React from 'react';
import FormLabel from 'components/text/FormLabel';
import HintText from 'components/text/HintText';

const Container = styled.div`
  margin-top: 22px;
`;

const Required = styled.span`
  color: ${p => p.theme.colors.red4};
  font-size: 17px;
  position: relative;
  top: 4px;
  right: -3px;
`;

class FormItem extends React.PureComponent {
  render() {
    const {label, colon, hint, children, containerProps, required} = this.props;
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
