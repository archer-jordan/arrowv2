import EmployeeReports from 'collections/EmployeeReports/model';
import Customers from 'collections/Customers/model';
import Employees from 'collections/Employees/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';
import moment from 'moment';
import ReferralPartners from 'collections/ReferralPartners/model';
import ReferralReports from 'collections/ReferralReports/model';

const runReferralPartnerReports = async ({dataRows, customer}) => {
  // referralStartDate: String,
  // referralEndDate: String,
  let start = moment(parseInt(customer.referralStartDate)).valueOf();
  let end = moment(parseInt(customer.referralEndDate)).valueOf();
  // 1. See if we are still inside the referral period (ie we still owe the referral partner money)
  // TODO: make sure we still owe this person referral money but checking the star tand end date of their referral agreement
  // 2. find the referral partner
  let partner = await ReferralPartners.findOne({
    _id: customer.referralPartnerId,
  });

  // 3. figure out how many employees qualify
  let qualifiedEmployees = [];

  dataRows.forEach((employee) => {
    // if the employee's hours for this month are greater than the required hours for this partners agreement, then we'll add them to the qualifiedEmployees array
    if (employee.hours >= partner.minimumReferralHours) {
      qualifiedEmployees.push(employee);
    }
  });

  let referralReport = {
    createdAt: moment().valueOf(),
    partnerId: customer.referralPartnerId,
    customerId: customer._id,
    date: new Date(),
    month: dataRows[0].month,
    year: dataRows[0].year,
    eligibleEmployees: qualifiedEmployees.length, // the number of employees who met the minimum hours
    employeesMeta: JSON.stringify(qualifiedEmployees), // stringify the array of employees who qualified... just for information purposes if we want to inspect later
    rate: partner.referralRate, // the rate paid, originally will be $12 per employee
  };

  let reportExists = await ReferralReports.findOne({
    month: dataRows[0].month,
    year: dataRows[0].year,
    partnerId: customer.referralPartnerId,
    customerId: customer._id,
  });

  // if report exists, update it. if it doesn't exist, create a new one.
  if (reportExists && reportExists._id) {
    await ReferralReports.updateOne(
      {
        _id: reportExists._id,
      },
      {
        $set: referralReport,
      }
    );
  } else {
    let newReport = new ReferralReports(referralReport);
    await newReport.save();
  }
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
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    let customer = await Customers.findOne({
      assignedId: args.values[0].companyAssignedId, // in the uploaded CSV/JSON, the companyAssignedId will be the company we want to upload
    });

    // make sure we have a customer in the database by the provided id
    if (!customer || !customer._id) {
      throw new Error(
        `Customer does not exist for id ${args.values[0].companyAssignedId}`
      );
    }

    let i;
    let errors = [];

    // for each row of data, make sure they exist in our employees database
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

    // if we have any errors at this point, return success=false along with an array of error messages
    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    /**
     * if we don't have any errors, then the good to move to the next step,
     * which is to for-each over each row of data. For each row we want to
     * 1. find the employee record for that row
     * 2. build a report object
     * 3. Check if a report for that month already exists,
     *        If it does exist, then we update it.
     *        If it doesn't exist, then we create a new one
     * */
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

    // check if customer has a referral partner, and if so, then we will generate a partner report
    if (customer.referralPartnerId) {
      runReferralPartnerReports({dataRows: args.values, customer});
    }

    // if our loop through each row of data is successful, return sucess=true
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

export default uploadEmployeeReports;
