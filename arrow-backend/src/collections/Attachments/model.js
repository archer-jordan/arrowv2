/**
 * ATTACHMENTS
 * This is a collection holds
 */

import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

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
      // CustomerUpload:
      // a basic attachment that is associated with a given company... typicaly a AJ superAdmin will
      // upload an attachment to a customer for record keeping purposes/for posterity/... these files are
      // only viewable by AJ employees and are not going to show up on the frontend where company
      // emloyees/admin would see them
      'CustomerUpload',
      // EmployeeDoc:  a document viewable by employees or company admins (coAdmins)
      'EmployeeDoc',
      // CompanyAdminDoc: a document only viewable by a customer's coAdmin (ie company admin) user roles
      'CompanyAdminDoc',
    ],
  },
});

// create indexes
schema.index({customerId: 1, type: 1});

const Attachments = Mongo.model('Attachments', schema);

export default Attachments;
