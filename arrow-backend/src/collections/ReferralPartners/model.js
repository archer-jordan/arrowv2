import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const attachmentSchema = {
  id: String,
  filename: String,
  url: String,
  mimetype: String,
  key: String,
};

const schema = new Mongo.Schema({
  ...baseFields,
  userId: {
    type: String,
    required: true,
  },
  applicationSubmittedDate: String,
  phone: String,
  partnerType: {
    type: String,
    enum: [
      'lifeAndHealthBroker',
      'propertyAndCasualaty',
      'investmentAdvisor',
      'cpa',
      'attorney',
      'consultant',
      'industryInfluencer',
      'other',
    ],
  },
  // minimumReferralHours: Number,
  // referralRate: Number,
  w9Doc: attachmentSchema,
  achDoc: attachmentSchema,
  parterAgreementDoc: attachmentSchema,
  status: {
    type: String,
    enum: ['approved', 'pending'],
  },
});

const ReferralPartners = Mongo.model('ReferralPartners', schema);

export default ReferralPartners;
