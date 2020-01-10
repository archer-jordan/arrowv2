import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  customerId: String,
  assignedId: String,
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  status: {
    type: String,
    enum: ['Active', 'Terminated'],
  },
  dob: String, // timestamp
  hireDate: String, // timestamp
  ssn: String,
  // location
  street: String,
  zip: String,
  state: String,
  city: String,
});

// create indexes
schema.index({customerId: 1, assignedId: 1});

const Employees = Mongo.model('Employees', schema);

export default Employees;
