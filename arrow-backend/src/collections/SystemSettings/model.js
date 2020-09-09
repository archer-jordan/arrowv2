import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  minimumReferralHours: Number, // 66
  referralRate: Number, // in cents, 1200
});

const SystemSettings = Mongo.model('SystemSettings', schema);

export default SystemSettings;
