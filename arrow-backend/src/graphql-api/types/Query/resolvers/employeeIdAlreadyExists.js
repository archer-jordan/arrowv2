import Employees from 'collections/Employees/model';

const employeeIdAlreadyExists = async (root, args, context) => {
  if (!context.user.roles || !context.user.roles.includes('superAdmin')) {
    throw new Error('You must be an admin to do that');
  }

  let user = await Employees.findOne({
    assignedId: args.assignedId,
    customerId: args.customerId,
  });

  if (user && user._id) {
    return {
      exists: true,
    };
  }
  return {
    exists: false, // false, no the email does not exist
  };
};

export default employeeIdAlreadyExists;
