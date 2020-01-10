import EmployeeReports from 'collections/EmployeeReports/model';
import Customers from 'collections/Customers/model';
import Employees from 'collections/Employees/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const uploadEmployeeReports = async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    let customer = await Customers.findOne({
      assignedId: args.values[0].companyAssignedId,
    });

    if (!customer || !customer._id) {
      throw new Error(
        `Customer does not exist for id ${args.values[0].companyAssignedId}`
      );
    }

    let i;
    let errors = [];

    for (i = 0; i < args.values.length; i++) {
      let item = args.values[i];
      let employee = await Employees.findOne({
        assignedId: item.assignedId,
        customerId: customer._id,
      });
      if (!employee || !employee._id) {
        errors.push(`Employee with id ${item.assignedId} does not exist`);
      }
    }

    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    for (i = 0; i < args.values.length; i++) {
      let item = args.values[i];
      let employee = await Employees.findOne({
        assignedId: item.assignedId,
        customerId: customer._id,
      });
      // build the report object
      let report = {
        employeeId: employee._id, // the database id of the employee
        customerId: customer._id, // the database id of the customer/company
        month: item.month,
        year: item.year,
        hours: item.hours,
        fringeDollars: item.fringeDollars,
        healthAndWelfare: item.healthAndWelfare,
        retirement: item.retirement,
        fringeDollarsLabel: item.fringeDollarsLabel,
        healthAndWelfareLabel: item.healthAndWelfareLabel,
        retirementLabel: item.retirementLabel,
        benefits: item.benefits,
      };
      // setup query to check if report already exists
      let query = {
        employeeId: employee._id, // the database id of the employee
        customerId: customer._id, // the database id of the customer/company
        month: item.month,
        year: item.year,
      };
      // search for report
      let reportExists = await EmployeeReports.findOne(query);
      // if it exists, update it
      if (reportExists && reportExists._id) {
        // update existing
        await EmployeeReports.updateOne(query, {$set: report});
      } else {
        // else if it doesn't exist yet, insert a new one
        let doc = new EmployeeReports(report);
        await doc.save();
      }
    }

    // if we loop through okay, return sucess
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

export default uploadEmployeeReports;
