import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  userId: String,
  customerId: String,
  date: Date,
  month: String,
  year: String,
  hours: Number, // the hours for that month
  employeeCount: Number, // the number of employees who met the minimum hours
  rate: Number, // the rate paid, originally will be $12 per employee
});

const ReferralReports = Mongo.model('ReferralReports', schema);

export default ReferralReports;
