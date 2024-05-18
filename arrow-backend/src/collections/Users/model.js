import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  firstName: String,
  lastName: String,
  phone: String,
  numLoginAttempts: Number, // numer of login attempts, used to limit too many attempts
  lastLoginAttempt: Number, // timestamp
  services: {
    password: {
      reset: [
        {
          token: String,
          reason: String,
          when: Number,
          address: String,
        },
      ],
    },
  },
  emails: [
    {
      address: String,
    },
  ],
  title: String,
  employeeId: String,
  customerId: String,
  createdAt: Number,
  roles: {
    type: [String],
    enum: [
      'coEmployee', // the employees of a given customer (ie company)
      'coAdmin', // a company admin => the users for a given customer (ie company) who have "top-level" access to settings/data assocaited with that company (e.g. CEOs, Head ofHR dept, etc)
      'superAdmin', // an archer jordan employee who has access to our back-end/back-office administration dashboard/data
      'referral', // a referral partner who has access to a referral partner dashboard showing their earnings from making sales references, etc
    ],
  },
  permissions: {
    type: [String],
    enum: [
      'viewCompanyData', //
      'viewEmployeeData', //
      'manageUsers', //
    ],
  },
});

// create indexes
schema.index({customerId: 1});

const UserProfiles = Mongo.model('Users', schema);

// export for use elsewhere in the app
export default UserProfiles;
