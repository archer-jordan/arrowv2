import Customers from 'collections/Customers/model';
import Employees from 'collections/Employees/model';
import EmployeeReports from 'collections/EmployeeReports/model';
import CustomerReports from 'collections/CustomerReports/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const deleteCustomer = async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);
    // make sure a customer ID was passed
    if (!args.customerId) throw new Error('No customerId provided');
    // delete customers
    await Customers.remove({
      _id: args.customerId,
    });
    // delete employees
    await Employees.remove({
      customerId: args.customerId,
    });
    // delete employee reports
    await EmployeeReports.remove({
      customerId: args.customerId,
    });
    // delete customer reports
    await CustomerReports.remove({
      customerId: args.customerId,
    });
  } catch (err) {
    return err;
  }
};

export default deleteCustomer;
