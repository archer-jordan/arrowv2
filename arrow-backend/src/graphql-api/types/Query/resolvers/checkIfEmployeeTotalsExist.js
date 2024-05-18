import EmployeeReports from 'collections/EmployeeReports/model';
import Employees from 'collections/Employees/model';

const checkIfEmployeeTotalsExist = async (root, args, context) => {
  try {
    let errors = [];
    let i;

    if (!args.employeeAssignedIds || !args.employeeAssignedIds.length) {
      throw new Error('No data provided to checkIfEmployeeTotalsExist');
    }

    for (i = 0; i < args.employeeAssignedIds.length; i++) {
      // find the employee so we can get their database ID
      let formattedEmployeeAssignedId = args.employeeAssignedIds[i];

      if (args.employeeAssignedIds[i].length !== 12) {
        if (args.employeeAssignedIds[i].length === 11) {
          formattedEmployeeAssignedId = `0${args.employeeAssignedIds[i]}`;
        }
        if (args.employeeAssignedIds[i].length === 10) {
          formattedEmployeeAssignedId = `00${args.employeeAssignedIds[i]}`;
        }
        if (args.employeeAssignedIds[i].length === 9) {
          formattedEmployeeAssignedId = `000${args.employeeAssignedIds[i]}`;
        }
        let employee = await Employees.findOne({
          assignedId: formattedEmployeeAssignedId,
          customerId: customer._id,
        });
        if (!employee || !employee._id) {
          errors.push(
            `Employee with id ${args.employeeAssignedIds[i]} / ${formattedEmployeeAssignedId} does not exist`
          );
        }
      }
      let employee = await Employees.findOne({
        assignedId: formattedEmployeeAssignedId,
        customerId: args.customerId,
      });

      // if no employee exists for the given record, return errors
      if (!employee || !employee._id) {
        return {
          exists: false,
          errors: [`Employee in row  ${i + 1} does not exist for this company`],
        };
      }

      // lookup the reports
      let report = await EmployeeReports.findOne({
        employeeId: employee._id,
        customerId: args.customerId,
        month: args.month,
        year: args.year,
      });

      // if report exists,
      if (report && report._id) {
        errors.push(
          `The employee in row ${i + 1} already has a report for this month`
        );
      }
    }
    // return exists true if we have errors
    if (errors && errors.length && errors.length > 0) {
      return { exists: true, errors };
    }

    // if all is well, return exists false (i.e. no reports exists for these employees yet) and an empty errors array
    return { exists: false, errors: [] };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default checkIfEmployeeTotalsExist;
