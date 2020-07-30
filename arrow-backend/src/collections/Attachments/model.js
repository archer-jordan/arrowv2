import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

// EmployeeUploads: the source csv after you add or update employee uploads
// CustomerReportUploads: the source csv after you update customer reports
// EmployeeReportsUploads: the source csv after you update employee reports
// CustomerUpload: general uploads for a customer… CRM-esque feature
// CustomerPlan:

const schema = new Mongo.Schema({
  ...baseFields,
  id: String,
  filename: String,
  url: String,
  customerId: String,
  mimetype: String,
  key: String,
  type: {
    type: String,
    enum: [
      // 'EmployeeUploads',
      // 'CustomerReportUploads',
      // 'EmployeeReportsUploads',
      'CustomerUpload',
      // 'CustomerPlan',
      // 'EmployeePlan',
      'EmployeeDoc',
      'CompanyAdminDoc',
    ],
  },
});

// create indexes
schema.index({customerId: 1, type: 1});

const Attachments = Mongo.model('Attachments', schema);

export default Attachments;
