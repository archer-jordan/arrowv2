/**
 * ADMIN DOCS
 * This is a collection that holds information about attachments/media/files
 * that, as of today, are stored on S3.
 *
 * Admin docs different from attachments in that attachments
 * can be viewed by any user role, whereas admin does should only
 * ever be viewed by a user with role of superAdmin. As a result, we put them in
 * a separate collection for that sake of making it easier to ensure they stay private
 */

import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  id: String,
  filename: String,
  url: String,
  mimetype: String,
  key: String,
});

const AdminDocs = Mongo.model('AdminDocs', schema);

export default AdminDocs;
