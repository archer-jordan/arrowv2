import EmployeeReports from 'collections/EmployeeReports/model';
import Customers from 'collections/Customers/model';
import Employees from 'collections/Employees/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';
import moment from 'moment';
import ReferralPartners from 'collections/ReferralPartners/model';

const runReferralPartnerReports = async ({ dataRows, customer }) => {
  // referralStartDate: String,
  // referralEndDate: String,
  let start = moment(parseInt(customer.referralStartDate)).valueOf();
  let end = moment(parseInt(customer.referralEndDate)).valueOf();
  // 1. See if we are still inside the referral period (ie we still owe the referral partner money)

  // 2. find the referral partner
  let partner = await ReferralPartners.findOne({
    _id: customer.referralPartnerId,
  });
  // 3. figure out how many employees qualify
  let qualifiedEmployees = [];

  dataRows.forEach((item) => {
    if (item.hours) {
    }
  });
};

// assignedId: String
// companyAssignedId: String
// month: String
// year: String
// hours: String
// fringeDollars: String
// healthAndWelfare: String
// retirement: String
// benefits: [EmployeeReportBenefitInput]
// fringeDollarsLabel: String
// healthAndWelfareLabel: String
// retirementLabel: String

const uploadEmployeeReports = async (root, args, context) => {
  console.log(args);
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
      let formattedEAID = item.assignedId;

      if (item.assignedId.length !== 12) {
        if (item.assignedId.length === 11) {
          formattedEAID = `0${item.assignedId}`;
        }
        if (item.assignedId.length === 10) {
          formattedEAID = `00${item.assignedId}`;
        }
        if (item.assignedId.length === 9) {
          formattedEAID = `000${item.assignedId}`;
        }
        let employee = await Employees.findOne({
          assignedId: formattedEAID,
          customerId: customer._id,
        });
        if (!employee || !employee._id) {
          errors.push(
            `Employee with id ${item.assignedId} / ${formattedEAID} does not exist`
          );
        }
      }
      if (item.assignedId.length === 12) {
        let employee = await Employees.findOne({
          assignedId: item.assignedId,
          customerId: customer._id,
        });
        if (!employee || !employee._id) {
          errors.push(`Employee with id ${item.assignedId} does not exist`);
        }
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
      console.log(item.benefits);
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
        await EmployeeReports.updateOne(query, { $set: report });
      } else {
        // else if it doesn't exist yet, insert a new one
        let doc = new EmployeeReports(report);
        await doc.save();
      }
    }

    // check if customer has a referral partner, and if so, then we will generate a partner report
    // if (customer.referralPartnerId) {
    //   runReferralPartnerReports({dataRows: args.values, customer});
    // }

    // if our loop through each row of data is successful, return sucess=true
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

export default uploadEmployeeReports;
