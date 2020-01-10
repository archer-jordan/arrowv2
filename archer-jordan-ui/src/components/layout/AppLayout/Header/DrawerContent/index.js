import React from 'react';
import styled from 'styled-components';

const DrawerHeader = styled.div`
  color: ${p => (p.active ? p.theme.colors.support1 : p.theme.colors.primary1)};
  font-size: 18px;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 1px;
`;

const DrawerSubeader = styled.div`
  color: ${p => (p.active ? p.theme.colors.support1 : p.theme.colors.neutral6)};
  font-size: 16px;
  margin-bottom: 8px;
`;

const DrawerGroup = styled.div`
  margin-bottom: 24px;
`;

const RESET_TABS = {
  tab: null,
  //month: null,
  //year: null,
};

const DrawerContent = ({
  pathname,
  onUrlChange,
  activeTab,
  currentUser,
  onLogout,
}) => {
  let canViewReports =
    currentUser.roles.includes('coAdmin') &&
    currentUser.permissions.includes('viewCompanyData');
  return (
    <div>
      {' '}
      {canViewReports || currentUser.roles.includes('superAdmin') ? (
        <DrawerGroup>
          {/* Only show the reports tab if the user is a superadmin OR a coAdmin+viewCompanyData */}
          <DrawerHeader>Reports</DrawerHeader>
          <DrawerSubeader
            active={activeTab === 'health'}
            onClick={() => onUrlChange('reports', {tab: 'health'})}
          >
            Health & Welfare
          </DrawerSubeader>
          <DrawerSubeader
            active={activeTab === 'eligibility'}
            onClick={() => onUrlChange('reports', {tab: 'eligibility'})}
          >
            Eligibility
          </DrawerSubeader>
          <DrawerSubeader
            active={activeTab === 'benefits'}
            onClick={() => onUrlChange('reports', {tab: 'benefits'})}
          >
            Benefits
          </DrawerSubeader>
          <DrawerSubeader
            active={activeTab === 'retirement'}
            onClick={() => onUrlChange('reports', {tab: 'retirement'})}
          >
            Retirement
          </DrawerSubeader>
          <DrawerSubeader
            active={activeTab === 'download'}
            onClick={() => onUrlChange('reports', {tab: 'download'})}
          >
            Download XL
          </DrawerSubeader>
        </DrawerGroup>
      ) : null}
      {/* Only show the dashboard if the user is an employee */}
      {currentUser.roles.includes('coEmployee') && (
        <DrawerGroup>
          <DrawerHeader>Dashboard</DrawerHeader>
          <DrawerSubeader
            active={activeTab === 'benefits'}
            onClick={() => onUrlChange('dashboard', {tab: 'benefits'})}
          >
            Benefits
          </DrawerSubeader>
          <DrawerSubeader
            active={activeTab === 'financials'}
            onClick={() => onUrlChange('dashboard', {tab: 'financials'})}
          >
            Financials
          </DrawerSubeader>
          <DrawerSubeader
            active={activeTab === 'account'}
            onClick={() => onUrlChange('dashboard', {tab: 'account'})}
          >
            Account
          </DrawerSubeader>
        </DrawerGroup>
      )}
      <DrawerGroup>
        {' '}
        <DrawerHeader>Account</DrawerHeader>
        <DrawerSubeader
          active={activeTab === 'profile'}
          onClick={() => onUrlChange('account', {tab: 'profile'})}
        >
          Profile
        </DrawerSubeader>
        <DrawerSubeader
          active={activeTab === 'plan'}
          onClick={() => onUrlChange('account', {tab: 'plan'})}
        >
          Plan
        </DrawerSubeader>
        <DrawerSubeader
          active={activeTab === 'password'}
          onClick={() => onUrlChange('account', {tab: 'password'})}
        >
          Account
        </DrawerSubeader>{' '}
      </DrawerGroup>
      {((currentUser.roles.includes('coAdmin') &&
        currentUser.permissions.includes('viewEmployeeData')) ||
        currentUser.roles.includes('superAdmin')) && (
        <DrawerGroup>
          <DrawerHeader
            active={pathname.includes('employees')}
            onClick={() => onUrlChange('employees', RESET_TABS)}
          >
            Employees
          </DrawerHeader>
        </DrawerGroup>
      )}
      {((currentUser.roles.includes('coAdmin') &&
        currentUser.permissions.includes('manageUsers')) ||
        currentUser.roles.includes('superAdmin')) && (
        <DrawerGroup>
          <DrawerHeader
            active={pathname.includes('users')}
            onClick={() => onUrlChange('users', RESET_TABS)}
          >
            Users
          </DrawerHeader>
        </DrawerGroup>
      )}
      <DrawerGroup>
        <DrawerHeader
          active={pathname.includes('support')}
          onClick={() => onUrlChange('support', RESET_TABS)}
        >
          Support
        </DrawerHeader>
      </DrawerGroup>
      <DrawerHeader onClick={onLogout}>Sign-out</DrawerHeader>
    </div>
  );
};

export default DrawerContent;
