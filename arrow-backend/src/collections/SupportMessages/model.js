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
  messageType: {
    type: String,
    enum: ['software', 'benefits', 'data', 'account'],
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
  },
});

const SupportMessages = Mongo.model('SupportMessages', schema);

export default SupportMessages;
