import EmployeeReports from "collections/EmployeeReports/model";
import Employees from "collections/Employees/model";

const employeeReportByEmployeeId = async (root, args, { user }) => {
  try {
    // can only view if
    // 1. super admin OR

    let query = {
      year: args.year,
      month: args.month,
      employeeId: args.employeeId,
    };

    const employeeReport = await EmployeeReports.findOne(query);

    if (user.roles.includes("superAdmin")) {
      return employeeReport;
    }

    // if its a company employee, make sure they can only query their own record
    if (user.roles.includes("coEmployee")) {
      query.employeeId = user.employeeId;
      return employeeReport;
    }

    // if company admin, make sure they have permissions AND are viewing an employee form their onw company
    if (user.roles.includes("coAdmin")) {
      if (!user.permissions.includes("viewEmployeeData")) {
        throw new Error("You do not have persmissions to view employee data");
      }
      let employee = await Employees.findOne({ _id: args.employeeId });

      if (!employee || !employee._id) {
        throw new Error("That employee does not exist");
      }
      // check to make sure the coAdmin is only trying to view an employee from their own company
      if (employee.customerId !== user.customerId) {
        throw new Error(
          "Admins can only view employees from their own companies"
        );
      }

      return await employeeReport;
    }

    // be default return empty result
    return [];
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default employeeReportByEmployeeId;
