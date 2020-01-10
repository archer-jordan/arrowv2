import {gql} from 'apollo-server';

export const EmployeeResolvers = {
  Employee: {
    // mongo uses _id as the primary key field, for simplifying the UI we change this to be just id
    id: root => root._id,
    ssn: (root, args, context) => {
      if (!context.user) return null;
      if (!context.user.roles) return null;
      if (!context.user.roles.length) return null;
      if (context.user.roles.length === 0) return null;
      // only return the ssn if the user has a superAdmin role
      if (context.user.roles.includes('superAdmin')) return root.ssn;
      // default is to return null
      return null;
    },
  },
};

export const EmployeeSchema = gql`
  input EmployeeParams {
    firstName: String
    lastName: String
    email: String
    gender: GenderEnum
    dob: String
    hireDate: String
    ssn: String
    street: String
    zip: String
    state: String
    city: String
    assignedId: String
    status: EmployeeStatusEnum
    assignedCustomerId: String
  }

  enum EmployeeSortByEnum {
    lastnameDesc
    lastnameAsc
  }

  enum GenderEnum {
    male
    female
  }

  enum EmployeeStatusEnum {
    Active
    Terminated
  }

  type Employee {
    id: String
    firstName: String
    lastName: String
    email: String
    gender: GenderEnum
    dob: String
    hireDate: String
    ssn: String
    street: String
    zip: String
    state: String
    city: String
    assignedId: String
    status: EmployeeStatusEnum
    "This is the user-generated ID for the company/customer this user belongs to"
    assignedCustomerId: String
  }
`;
