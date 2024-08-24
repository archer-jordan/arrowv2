import EmployeeReports from "collections/EmployeeReports/model";
import Customers from "collections/Customers/model";
import Employees from "collections/Employees/model";
import userIsSuperAdmin from "modules/helpers/userIsSuperAdmin";
import moment from "moment";
import ReferralPartners from "collections/ReferralPartners/model";

const runReferralPartnerReports = async ({ dataRows, customer }) => {
  let start = moment(parseInt(customer.referralStartDate)).valueOf();
  let end = moment(parseInt(customer.referralEndDate)).valueOf();
  // 1. See if we are still inside the referral period (ie we still owe the referral partner money)

  // 2. Find the referral partner
  let partner = await ReferralPartners.findOne({
    _id: customer.referralPartnerId,
  });
  // 3. Figure out how many employees qualify
  let qualifiedEmployees = [];

  dataRows.forEach((item) => {
    if (item.hours) {
      // Logic to determine qualified employees
    }
  });
};

const uploadEmployeeReports = async (root, args, context) => {
  console.log(args);
  try {
    // Check if user is a super admin
    userIsSuperAdmin(context.user);

    let customer = await Customers.findOne({
      assignedId: args.values[0].companyAssignedId,
    });

    if (!customer || !customer._id) {
      throw new Error(
        `Customer does not exist for id ${args.values[0].companyAssignedId}`
      );
    }

    let errors = [];

    for (let i = 0; i < args.values.length; i++) {
      let item = args.values[i];

      // Try to find the employee with the original assignedId
      let employee = await Employees.findOne({
        $or: [
          { assignedId: originalId, customerId: args.customerId },
          { assignedId: modifiedId, customerId: args.customerId }
        ]
      });

      // If employee still doesn't exist, push an error
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

    for (let i = 0; i < args.values.length; i++) {
      let item = args.values[i];

      // Find employee again as it might have been modified previously
      let employee = await Employees.findOne({
        assignedId: item.assignedId,
        customerId: customer._id,
      });

      if (!employee || !employee._id) {
        employee = await Employees.findOne({
          assignedId: item.assignedId.replace(/^000/, ''),
          customerId: customer._id,
        });
      }

      // Build the report object
      let report = {
        employeeId: employee._id,
        customerId: customer._id,
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

      // Setup query to check if report already exists
      let query = {
        employeeId: employee._id,
        customerId: customer._id,
        month: item.month,
        year: item.year,
      };

      // Search for report
      let reportExists = await EmployeeReports.findOne(query);

      // If it exists, update it
      if (reportExists && reportExists._id) {
        await EmployeeReports.updateOne(query, { $set: report });
      } else {
        // Else, insert a new one
        let doc = new EmployeeReports(report);
        await doc.save();
      }
    }

    // Optionally, run referral partner reports if needed
    // if (customer.referralPartnerId) {
    //   runReferralPartnerReports({ dataRows: args.values, customer });
    // }

    // Return success if everything went smoothly
    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      errors: [err.message],
    };
  }
};

export default uploadEmployeeReports;
