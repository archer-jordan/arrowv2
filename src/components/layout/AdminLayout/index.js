import React from 'react';
import styled from 'styled-components';

// STYLE-COMPONENTS
// ===================================
const AdminLayout = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
  background-color: ${p => (p.backgroundColor ? p.backgroundColor : null)};
`;

// EXPORT
// ===================================
export default ({children, backgroundColor}) => (
  <AdminLayout id="admin-layout" backgroundColor={backgroundColor}>
    {children}
  </AdminLayout>
);
