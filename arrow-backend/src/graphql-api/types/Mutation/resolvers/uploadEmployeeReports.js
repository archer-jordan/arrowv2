import EmployeeReports from "collections/EmployeeReports/model";
import Customers from "collections/Customers/model";
import Employees from "collections/Employees/model";
import userIsSuperAdmin from "modules/helpers/userIsSuperAdmin";
import moment from "moment";
import ReferralPartners from "collections/ReferralPartners/model";
// Helper function to query Employee by assignedId variations
const getEmployeeByIdVariations = async (assignedId, customerId) => {
  const idVariations = [
    assignedId,
    `000${assignedId}`,
    assignedId.toString().padStart(3, '0'),
    assignedId,
  ];

  for (let id of idVariations) {
    const employee = await Employees.findOne({ assignedId: id, customerId });
    if (employee) return employee;
  }

  return null;
};

const runReferralPartnerReports = async ({ dataRows, customer }) => {
  let start = moment(parseInt(customer.referralStartDate)).valueOf();
  let end = moment(parseInt(customer.referralEndDate)).valueOf();

  // Find the referral partner
  let partner = await ReferralPartners.findOne({
    _id: customer.referralPartnerId,
  });

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
    userIsSuperAdmin(context.user);

    const customer = await Customers.findOne({
      assignedId: args.values[0].companyAssignedId,
    });

    if (!customer || !customer._id) {
      throw new Error(
        `Customer does not exist for id ${args.values[0].companyAssignedId}`
      );
    }

    let errors = [];

    for (let i = 0; i < args.values.length; i++) {
      const item = args.values[i];
      const employee = await getEmployeeByIdVariations(item.assignedId, customer._id);

      if (!employee) {
        errors.push(`Employee with id ${item.assignedId} does not exist`);
        continue;
      }

      // Build the report object
      const report = {
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
      const query = {
        employeeId: employee._id,
        customerId: customer._id,
        month: item.month,
        year: item.year,
      };

      // Search for report and update if it exists, else insert a new one
      const reportExists = await EmployeeReports.findOne(query);
      if (reportExists) {
        await EmployeeReports.updateOne(query, { $set: report });
      } else {
        const doc = new EmployeeReports(report);
        await doc.save();
      }
    }

    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    // Optionally, run referral partner reports if needed
    // if (customer.referralPartnerId) {
    //   runReferralPartnerReports({ dataRows: args.values, customer });
    // }

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
