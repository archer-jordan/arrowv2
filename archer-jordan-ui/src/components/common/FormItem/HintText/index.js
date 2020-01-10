import styled from 'styled-components';
import FormLabel from '../FormLabel';

const HintText = styled(FormLabel)`
  color: ${p => p.theme.colors.neutral7};
  margin-top: 8px;
  margin-bottom: 8px;
`;

export default HintText;
