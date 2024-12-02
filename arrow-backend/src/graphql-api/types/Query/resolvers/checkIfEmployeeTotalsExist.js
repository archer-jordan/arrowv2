import EmployeeReports from 'collections/EmployeeReports/model';
import Employees from 'collections/Employees/model';
import { assign } from 'lodash';

const checkIfEmployeeTotalsExist = async (root, args, context) => {
  try {
    if (!args.employeeAssignedIds || !args.employeeAssignedIds.length) {
      throw new Error('No data provided to checkIfEmployeeTotalsExist');
    }

    const errors = [];

    const getAssignedIdVariations = (id) => {
      const modifiedId = `000${id}`;
      return [
        { assignedId: id, customerId: args.customerId },
        { assignedId: modifiedId, customerId: args.customerId },
        { assignedId: id.substring(3), customerId: args.customerId }
      ];
    };

    for (let i = 0; i < args.employeeAssignedIds.length; i++) {


      // Attempt to find the employee using ID variations
      const employee = await Employees.findOne({
        $or: getAssignedIdVariations(args.employeeAssignedIds[i])
      });

      // If no employee exists, add an error and continue to the next iteration
      if (!employee) {
        errors.push(`No employee found for row ${i + 1} with ID ${args.employeeAssignedIds[i]}.`);
        continue;
      }

      // Lookup the report for the found employee
      const report = await EmployeeReports.findOne({
        employeeId: employee._id,
        customerId: args.customerId,
        month: args.month,
        year: args.year
      });

      // If a report exists, add an error
      if (report) {
        errors.push(`The employee in row ${i + 1} with ID ${args.employeeAssignedIds[i]} already has a report for this month.`);
      }
    }

    // Return exists true if there are errors, otherwise false
    return { exists: errors.length > 0, errors };

  } catch (err) {
    console.error(err);
    return { exists: false, errors: [err.message] };
  }
};

export default checkIfEmployeeTotalsExist;
