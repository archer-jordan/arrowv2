const userIsSuperAdmin = user => {
  if (!user) throw new Error('You must be logged in to do that');
  if (!user.roles) throw new Error('You must be a super admin to do that');
  if (!user.roles.length)
    throw new Error('You must be a super admin to do that');
  if (user.roles.length === 0)
    throw new Error('You must be a super admin to do that');
  // only return the ssn if the user has a superAdmin role
  if (!user.roles.includes('superAdmin'))
    throw new Error('You must be a super admin to do that');
};

export default userIsSuperAdmin;
