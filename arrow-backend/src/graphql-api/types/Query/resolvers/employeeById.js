import Employees from 'collections/Employees/model';

const employeeById = async (root, {id}, {user}) => {
  let query = {_id: id};

  if (user.roles.includes('superAdmin')) {
    return await Employees.findOne(query);
  }

  if (user.roles.includes('coEmployee')) {
    query._id = user.employeeId;
    return await Employees.findOne(query);
  }

  // if company admin, make sure they have permissions AND are viewing an employee form their onw company
  if (user.roles.includes('coAdmin')) {
    if (!user.permissions.includes('viewEmployeeData')) {
      throw new Error('You do not have persmissions to view employee data');
    }
    let employee = await Employees.findOne({_id: id});
    if (!employee || !employee._id) {
      throw new Error('That employee does not exist');
    }
    // check to make sure the coAdmin is only trying to view an employee from their own company
    if (employee.customerId !== user.customerId) {
      throw new Error(
        'Admins can only view employees from their own companies'
      );
    }
    return await Employees.findOne(query);
  }

  return null;
};

export default employeeById;
