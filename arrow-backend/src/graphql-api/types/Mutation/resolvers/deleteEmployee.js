import Employees from 'collections/Employees/model';
import Users from 'collections/Users/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const deleteEmployee = async (root, {employeeId}, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    let employeeExists = await Employees.findOne({
      _id: employeeId,
    });

    if (employeeExists && employeeExists._id) {
      // delete employees
      await Employees.remove({
        _id: employeeId,
      });
      // delete user
      await Users.remove({
        employeeId,
      });

      return {
        success: true,
      };
    } else {
      throw new Error('Employee does not exist');
    }
  } catch (err) {
    return {
      success: false,
      errors: [err.message],
    };
  }
};

export default deleteEmployee;
