import styled from 'styled-components';
import React from 'react';
import FormLabel from 'components/text/FormLabel';
import HintText from 'components/text/HintText';

const Container = styled.div`
  margin-top: 22px;
`;

class FormItem extends React.PureComponent {
  render() {
    const {label, colon, hint, children, containerProps} = this.props;
    return (
      <Container {...containerProps}>
        {label && (
          <FormLabel>
            {label}
            {colon ? ':' : null}
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
};

export default FormItem;
