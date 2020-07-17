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
