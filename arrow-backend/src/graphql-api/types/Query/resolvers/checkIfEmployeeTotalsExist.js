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

      let employee = await Employees.findOne({
        assignedId:
          args.employeeAssignedIds[i].length === 12
            ? args.employeeAssignedIds[i]
            : `000${args.employeeAssignedIds[i]}`,
        customerId: args.customerId,
      });


      let legacyEmployee = await Employees.findOne({
        assignedId: {
          $regex: new RegExp(`^0*${args.employeeAssignedIds[i].replace(/^000/, '')}$`),
        },
        customerId: args.customerId,
      });

      if (legacyEmployee && legacyEmployee._id) {
        employee = "000"+legacyEmployee;
      }
console.log("leg", legacyEmployee);

      if(!legacyEmployee && !legacyEmployee._id) {
        return {
          exists: false,
          errors: [
            `Employee in row  ${i + 1} / 000${
              args.employeeAssignedIds[i]
            } does not exist for this company`,
          ],
        };
      }
console.log("employee", employee);
      // if no employee exists for the given record, return errors
      if (!employee || !employee._id) {
        return {
          exists: false,
          errors: [
            `Employee in row  ${i + 1} / 000${
              args.employeeAssignedIds[i]
            } does not exist for this company`,
          ],
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
