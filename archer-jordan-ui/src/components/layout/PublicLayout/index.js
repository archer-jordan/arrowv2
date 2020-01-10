import React from 'react';
import styled from 'styled-components';

// STYLE-COMPONENTS
// ===================================
const PublicLayout = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
  background-color: ${p => (p.backgroundColor ? p.backgroundColor : null)};
`;

// EXPORT
// ===================================
export default ({children, backgroundColor}) => (
  <PublicLayout id="public-layout" backgroundColor={backgroundColor}>
    {children}
  </PublicLayout>
);
