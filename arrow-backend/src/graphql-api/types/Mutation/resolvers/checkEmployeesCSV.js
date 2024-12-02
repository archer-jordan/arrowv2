import Employees from 'collections/Employees/model';
import Customers from 'collections/Customers/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

/**
 * We want to check and see if any of the employees in the array already exist
 * If they do, we add a note to the array of errors we'll return
 */
const checkEmployeesCSV = async (root, args, context) => {
  let errors = [];

  // Check permissions
  // check if user is a super admin
  userIsSuperAdmin(context.user);

  // look up the customer
  let customer = await Customers.findOne({
    assignedId: args.values[0].companyAssignedId,
  });

  // if we can't find the customer, we'll return an error
  if (!customer || !customer._id) {
    return {
      success: false,
      errors: [
        `${args.values[0].companyAssignedId} is not a customer in our database`,
      ],
    };
  }

  let i;

  for (i = 0; i < args.values.length; i++) {
    // lookup to see if the empoyee already exists
    let result = await Employees.findOne({
      customerId: customer._id,
      assignedId: args.values[i].employeeAssignedId,
    });
    // if the user is found/exists, then we'll add an error to the array of errors.
    // Later on in this resovler we return this array of errors to let the user know how many users already exist in the database
    if (result && result._id) {
      console.log('Employee already exists', result, args.values[i].employeeAssignedId, customer._id, result._id);
      errors.push(`Employee in row ${i + 1} already exists in the database`);

    }
  }

  // if there are any errors after going through the above for loop, we return sucess = false and the array of errors
  if (errors.length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // if we have no errors, we return success true
  return {
    success: true,
    errors: [],
  };
};

export default checkEmployeesCSV;
