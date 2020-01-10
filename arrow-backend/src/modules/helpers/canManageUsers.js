const canManageUsers = user => {
  if (!user) {
    return false;
  }
  if (!user.roles) {
    return false;
  }
  if (!user.roles.length) {
    return false;
  }
  if (user.roles.length === 0) {
    return false;
  }
  // only return the ssn if the user has a superAdmin role
  if (user.roles.includes('superAdmin')) {
    return true;
  }
  // OR company admin AND manageUsers
  if (!user.permissions) {
    return false;
  }
  if (user.permissions.length === 0) {
    return false;
  }
  // only return the ssn if the user has a superAdmin role
  if (
    user.roles.includes('coAdmin') &&
    user.permissions.includes('manageUsers')
  ) {
    return true;
  }
};

export default canManageUsers;
