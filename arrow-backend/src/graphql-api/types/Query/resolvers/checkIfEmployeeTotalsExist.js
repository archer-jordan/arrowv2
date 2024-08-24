import EmployeeReports from 'collections/EmployeeReports/model';
import Employees from 'collections/Employees/model';

const checkIfEmployeeTotalsExist = async (root, args, context) => {
  try {
    if (!args.employeeAssignedIds || !args.employeeAssignedIds.length) {
      throw new Error('No data provided to checkIfEmployeeTotalsExist');
    }

    const errors = [];

    for (let i = 0; i < args.employeeAssignedIds.length; i++) {
      const originalId = args.employeeAssignedIds[i];
      const modifiedId = `000${originalId}`;

      // Attempt to find the employee using either the original or modified assignedId
      const employee = await Employees.findOne({
        $or: [
          { assignedId: originalId, customerId: args.customerId },
          { assignedId: modifiedId, customerId: args.customerId }
        ]
      });

      // If no employee exists, add an error and continue to the next iteration
      if (!employee) {
        errors.push(
          `Employee in row ${i + 1} / ${originalId} does not exist for this company (checked as ${modifiedId}).`
        );
        continue;  // Skip to the next employeeAssignedId
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
        errors.push(
          `The employee in row ${i + 1} already has a report for this month.`
        );
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
