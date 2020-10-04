import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const attachmentSchema = {
  id: String,
  filename: String,
  url: String,
  mimetype: String,
  key: String,
  partnerUserId: String, // the user id of the referral partner, we use this so we can ensure only the original uploader can view the document (or a super admin)
  type: {
    type: String,
    defaul: 'ReferralPartnerDoc', // will allow us to make sure that referral partners can only see referral docs
  },
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
      'propertyAndCasualty',
      'investmentAdvisor',
      'cpa',
      'attorney',
      'consultant',
      'industryInfluencer',
      'other',
    ],
  },
  w9Doc: attachmentSchema,
  achDoc: attachmentSchema,
  parterAgreementDoc: attachmentSchema,
  status: {
    type: String,
    enum: ['approved', 'pending'],
  },
  // addresses
  address: String,
  city: String,
  state: String,
  zip: String,
});

const ReferralPartners = Mongo.model('ReferralPartners', schema);

export default ReferralPartners;
