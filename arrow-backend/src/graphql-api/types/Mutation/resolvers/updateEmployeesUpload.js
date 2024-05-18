import Employees from 'collections/Employees/model';
import Customers from 'collections/Customers/model';
import moment from 'moment';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';
import updateUserOnEmployeeChange from 'modules/helpers/updateUserOnEmployeeChange';

/*
  updateEmployeesUpload is used when a super admin wants to do a bulk upload via a CSV
*/
const updateEmployeesUpload = async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    // lookup the customer we want to update
    let customer = await Customers.findOne({_id: args.customerId});
    let i;
    let errors = [];

    // if no customer exists, throw an error
    if (!customer) {
      return {
        success: false,
        errors: ['Customer does not exist'],
      };
    }

    // First, go through the entire array of data and make sure each employee exists, if they don't throw an error
    for (i = 0; i < args.employees.length; i++) {
      // find the customer record to ensure each employee record exists
      let currentEmployee = await Employees.findOne({
        assignedId: args.employees[i].assignedId,
        customerId: customer._id,
      });
      // if any of the employee records do not exist, we add an error message to the errors array
      if (!currentEmployee || !currentEmployee._id) {
        errors.push(`The user in row ${i + 2} does not exist`);
      }
    }

    // if we have any errors anywhere in the array, we don't run the update. We just return an errors array with success = false.
    if (errors && errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    // We are not going to run updates for each employee record in the array
    for (i = 0; i < args.employees.length; i++) {
      // grab our employee object (from the CSV) using the index
      let employee = args.employees[i];

      // find the current employee record using customerId and the assignedId
      let currentEmployee = await Employees.findOne({
        assignedId: args.employees[i].assignedId,
        customerId: customer._id,
      });

      // update employee record using _id
      await Employees.updateOne(
        {
          _id: currentEmployee._id,
        },
        {
          $set: {
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            gender: employee.gender,
            dob: employee.dob,
            hireDate: employee.hireDate,
            ssn: employee.ssn,
            street: employee.street,
            zip: employee.zip,
            state: employee.state,
            city: employee.city,
            status: employee.status,
            updatedAt: moment().valueOf(),
            updatedBy: context.user.id,
          },
        }
      );

      /**
       * updateUserOnEmployeeChange
       * run some code to see if we have to update any user records since employees
       * have two related tables... their record in the Employees collection/table
       * and their Users table/collcetion record... the User record is for authentication
       * but we need to keep their user record email in sync with their employee email
       */
      await updateUserOnEmployeeChange({currentEmployee, employee});

      // **** END FOR LOOP ****
    }

    return {
      success: true,
    };
  } catch (err) {
    // log the error
    console.log(err);
    // return success = false
    return {
      success: false,
      errors: [err.message],
    };
  }
};

export default updateEmployeesUpload;
