import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  partnerId: String, // the ReferralPartners ID of the partner
  customerId: String,
  date: Date, // date the report was created
  month: String,
  year: String,
  employeesMeta: String, // holds a stringified array of the "employee reports" that qualified for this report
  hours: Number, // the hours for that month
  eligibleEmployees: Number, // the number of employees who met the minimum hours
  rate: Number, // the rate paid, originally will be $12 per employee
});

const ReferralReports = Mongo.model('ReferralReports', schema);

export default ReferralReports;
