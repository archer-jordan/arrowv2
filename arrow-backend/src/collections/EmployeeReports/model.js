import Mongo from "modules/mongodb";
import baseFields from "../shared-models/base-fields";

const schema = new Mongo.Schema({
  ...baseFields,
  employeeId: String, // the database id of the employee
  customerId: String, // the database id of the customer/company
  month: String,
  year: String,
  hours: Number,
  fringeDollars: String,
  healthAndWelfare: String,
  retirement: String,
  // labels
  fringeDollarsLabel: String,
  healthAndWelfareLabel: String,
  retirementLabel: String,
  // benefits
  benefits: [
    {
      eligibility: String,
      hours: String,
      label: String,
    },
  ],
});

// create indexes
schema.index({ customerId: 1, employeeId: 1 });

const EmployeeReports = Mongo.model("EmployeeReports", schema);

export default EmployeeReports;
