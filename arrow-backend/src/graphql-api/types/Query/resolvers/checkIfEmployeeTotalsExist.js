import EmployeeReports from 'collections/EmployeeReports/model';
import Employees from 'collections/Employees/model';

const checkIfEmployeeTotalsExist = async (root, args, context) => {
  try {
    let errors = [];

    if (!args.employeeAssignedIds || !args.employeeAssignedIds.length) {
      throw new Error('No data provided to checkIfEmployeeTotalsExist');
    }

    for (let i = 0; i < args.employeeAssignedIds.length; i++) {
      const originalId = args.employeeAssignedIds[i];
      let toBeModifiedId = originalId;
      let modifiedId = `000${toBeModifiedId}`;

      // Find employee using the original assignedId
      let employee
      employee = await Employees.findOne({
        assignedId: originalId,
        customerId: args.customerId,
      });

      let modifiedEmployee;
      // If not found, try with the modified assignedId
      if (!employee || !employee._id) {
        modifiedEmployee = await Employees.findOne({
          assignedId: modifiedId,
          customerId: args.customerId,
        });
      }

      // If no employee exists for the given record, return errors
      if (!employee || !modifiedEmployee) {
        return {
          exists: false,
          errors: [
            `Employee in row ${i + 1} / ${originalId} does not exist for this company (checked as ${modifiedId}). tbm ${toBeModifiedId} modEmp: ${modifiedEmployee;}`,
          ],
        };
      }

      // Lookup the reports
      let report = await EmployeeReports.findOne({
        employeeId: !employee._id ? modifiedEmployee._id : employee._id,
        customerId: args.customerId,
        month: args.month,
        year: args.year,
      });

      // If report exists, add to errors
      if (report && report._id) {
        errors.push(
          `The employee in row ${i + 1} already has a report for this month`
        );
      }
    }

    // Return exists true if there are errors, otherwise false
    return { exists: errors.length > 0, errors };
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default checkIfEmployeeTotalsExist;
