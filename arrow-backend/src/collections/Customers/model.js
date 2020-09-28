import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  id: String,
  title: String,
  assignedId: String,
  companyType: {
    type: String,
    enum: ['llc', 'cCorp', 'sCorp', 'llp', 'other', null],
  },
  naics: String,
  sic: String,
  ein: String,
  status: {
    type: String,
    enum: ['pending', 'active', 'disabled', 'archived'],
  },
  // location
  street: String,
  zip: String,
  state: String,
  city: String,
  // attachments
  contacts: [
    {
      firstName: String,
      lastName: String,
      title: String,
      phone: String,
      email: String,
    },
  ],
  referralPartnerId: String, // the ReferralPartner _id for this customer (if one exists)
  referralStartDate: String,
  referralEndDate: String,
  //
  planType: {
    type: String,
    enum: ['arrowCare', 'arrowCarePlus'],
  },
  enrollmentWindowStart: String,
  enrollmentWindowEnd: String,
});

// ADD INDEXES
schema.index(
  {assignedId: 1, title: 1},
  {collation: {locale: 'en', strength: 2}}
);

const Customers = Mongo.model('Customers', schema);

export default Customers;
