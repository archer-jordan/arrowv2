import Users from 'collections/Users/model';

const emailAlreadyExists = async (root, args, context) => {
  if (!context.user) {
    throw new Error('You must be an admin to do that');
  }
  if (!context.user.roles) {
    throw new Error('You must be an admin to do that');
  }
  if (
    !context.user.roles.includes('superAdmin') &&
    !context.user.roles.includes('coAdmin')
  ) {
    throw new Error('You must be an admin to do that');
  }

  let user = await Users.findOne({'emails.0.address': args.email});

  if (user && user._id && user.employeeId) {
    return {
      exists: true,
      errors: ['Employee with this email exists'],
    };
  }

  if (user && user._id) {
    return {
      exists: true,
    };
  }
  return {
    exists: false, // false, no the email does not exist
  };
};

export default emailAlreadyExists;
