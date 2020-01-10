import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  name: String,
  email: String,
  subject: String,
  message: String,
  userId: String,
  customerId: String,
});

const SupportMessages = Mongo.model('SupportMessages', schema);

export default SupportMessages;
