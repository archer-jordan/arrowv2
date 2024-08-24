import EmployeeReports from "collections/EmployeeReports/model";
import Customers from "collections/Customers/model";
import Employees from "collections/Employees/model";
import userIsSuperAdmin from "modules/helpers/userIsSuperAdmin";
import moment from "moment";
import ReferralPartners from "collections/ReferralPartners/model";

// Refactor runReferralPartnerReports for modularity and clarity (if needed)
const runReferralPartnerReports = async ({ dataRows, customer }) => {
  const start = moment(parseInt(customer.referralStartDate, 10)).valueOf();
  const end = moment(parseInt(customer.referralEndDate, 10)).valueOf();

  // Find the referral partner
  const partner = await ReferralPartners.findOne({ _id: customer.referralPartnerId });

  // Determine qualified employees (add your logic here)
  const qualifiedEmployees = dataRows.filter((item) => item.hours);

  // Further processing...
};

const findEmployee = async (assignedId, customerId) => {
  // Check if employee exists with or without the "000" prefix
  return (
    await Employees.findOne({ assignedId, customerId }) ||
    Employees.findOne({ assignedId: assignedId.replace(/^000/, ''), customerId })
  );
};

const processEmployeeReports = async (employee, item, customerId) => {
  const report = {
    employeeId: employee._id,
    customerId,
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

  const query = {
    employeeId: employee._id,
    customerId,
    month: item.month,
    year: item.year,
  };

  // Check if the report exists and update or insert accordingly
  const reportExists = await EmployeeReports.findOne(query);
  if (reportExists) {
    await EmployeeReports.updateOne(query, { $set: report });
  } else {
    const newReport = new EmployeeReports(report);
    await newReport.save();
  }
};

const uploadEmployeeReports = async (root, args, context) => {
  console.log(args);
  try {
    // Check if user is a super admin
    userIsSuperAdmin(context.user);

    const customer = await Customers.findOne({
      assignedId: args.values[0].companyAssignedId,
    });

    if (!customer || !customer._id) {
      throw new Error(
        `Customer does not exist for id ${args.values[0].companyAssignedId}`
      );
    }

    const errors = [];
    const employeeMap = new Map();

    // Concurrently find all employees and check existence
    await Promise.all(
      args.values.map(async (item) => {
        const employee = await findEmployee(item.assignedId, customer._id);
        if (!employee) {
          errors.push(`Employee with id ${item.assignedId} does not exist`);
        } else {
          employeeMap.set(item.assignedId, employee);
        }
      })
    );

    if (errors.length > 0) {
      return { success: false, errors };
    }

    // Process employee reports concurrently
    await Promise.all(
      args.values.map(async (item) => {
        const employee = employeeMap.get(item.assignedId);
        await processEmployeeReports(employee, item, customer._id);
      })
    );

    // Optionally, run referral partner reports if needed
    // if (customer.referralPartnerId) {
    //   await runReferralPartnerReports({ dataRows: args.values, customer });
    // }

    // Return success if everything went smoothly
    return { success: true };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      errors: [err.message],
    };
  }
};

export default uploadEmployeeReports;
