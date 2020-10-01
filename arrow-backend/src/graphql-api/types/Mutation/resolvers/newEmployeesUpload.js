import Employees from 'collections/Employees/model';
import Customers from 'collections/Customers/model';
import Users from 'collections/Users/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const newEmployeesUpload = async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    // lookup the company we're updating
    let customer = await Customers.findOne({_id: args.customerId});

    // if the company does not exist, then throw an error
    if (!customer) {
      return {
        success: false,
        errors: ['Customer does not exist'],
      };
    }
    // for each over each row of employee data
    args.employees.forEach(async (item) => {
      let newEmployee = new Employees({...item, customerId: args.customerId});
      await newEmployee.save();

      // if a user exist with this email, then we want to add an employeeId to it
      let userByEmail;

      if (item.email) {
        userByEmail = await Users.findOne({
          'emails.0.address': item.email,
        });
      }

      if (userByEmail && userByEmail._id) {
        // if user by this email exists, then let's add an the new employee ID to the record and also update their roles to include employee role
        await Users.updateOne(
          {
            _id: userByEmail._id,
          },
          {
            employeeId: newEmployee._id,
            roles: [...userByEmail.roles, 'coEmployee'],
          }
        );
      }

      // check if a user exists and if it does, update the firstName and lastName
      await Users.updateOne(
        {
          employeeId: newEmployee._id,
        },
        {
          $set: {
            firstName: item.firstName,
            lastName: item.lastName,
          },
        }
      );
    });
    // if successful, return true
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      errors: [err.message],
    };
  }
};

export default newEmployeesUpload;
