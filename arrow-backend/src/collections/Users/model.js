import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  firstName: String,
  lastName: String,
  phone: String,
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
    enum: ['coEmployee', 'coAdmin', 'superAdmin'],
  },
  permissions: {
    type: [String],
    enum: ['viewCompanyData', 'viewEmployeeData', 'manageUsers'],
  },
});

// create indexes
schema.index({customerId: 1});

const UserProfiles = Mongo.model('Users', schema);

// export for use elsewhere in the app
export default UserProfiles;
