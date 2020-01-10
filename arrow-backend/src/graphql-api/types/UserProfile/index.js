import {gql} from 'apollo-server';
import Customers from 'collections/Customers/model';
import Employees from 'collections/Employees/model';
import Users from 'collections/Users/model';

export const UserProfileResolvers = {
  UserProfile: {
    id: root => {
      // in some cases we'll already have masked _id for id, so check if id exists and return that if it does exist
      if (root.id) return root.id;
      // if id doesn't exist yet, we'll return _id as id
      if (root._id) return root._id;
    },
    firstName: async root => {
      if (root.roles.includes('coEmployee') && root.employeeId) {
        let employee = await Employees.findOne({_id: root.employeeId});
        if (employee && employee.firstName) {
          return employee.firstName;
        }
      }
      if (root.employeeId) {
        let employee = await Employees.findOne({_id: root.employeeId});
        if (employee && employee.firstName) {
          return employee.firstName;
        }
      }
      return root.firstName;
    },
    lastName: async root => {
      if (root.roles.includes('coEmployee') && root.employeeId) {
        let employee = await Employees.findOne({_id: root.employeeId});
        if (employee && employee.lastName) {
          return employee.lastName;
        }
      }
      if (root.employeeId) {
        let employee = await Employees.findOne({_id: root.employeeId});
        if (employee && employee.lastName) {
          return employee.lastName;
        }
      }
      return root && root.lastName;
    },
    email: ({emails}) => {
      if (emails && emails[0]) {
        return emails[0].address;
      }
    },
    company: async root => {
      if (root.customerId) {
        let company = await Customers.findOne({_id: root.customerId});
        return company;
      }
      return null;
    },
    createdByEmail: async (root, args, context) => {
      if (!root.createdBy) return null;
      let user = await Users.findOne({_id: root.createdBy});
      return user && user.emails && user.emails[0].address;
    },
    companyStatus: async root => {
      if (root.customerId) {
        let company = await Customers.findOne({_id: root.customerId});
        return company.status;
      }
    },
  },
};

export const UserProfileSchema = gql`
  enum RoleTypeEnum {
    "User is an company/customer employee"
    coEmployee
    "User is an admin of a company/customer"
    coAdmin
    "Arrow admin user"
    superAdmin
  }

  enum UserPermissionEnum {
    "User can view summary company data"
    viewCompanyData
    "User can view employees data"
    viewEmployeeData
    "User can manage (create, read, update, delete) user accounts for their company"
    manageUsers
  }

  input UserParams {
    firstName: String
    lastName: String
    email: String
    title: String
    phone: String
    "The database ID of the customer (ie company) that the user belongs to"
    customerId: ID
    "If the user is an employee, this field will hold the database ID pointing to their employee record"
    employeeId: ID
    roles: [RoleTypeEnum]
    permissions: [UserPermissionEnum]
  }

  "The main User object used for authentication etc"
  type UserProfile {
    id: String
    firstName: String
    lastName: String
    "The users title (e.g. CEO, CTO, Developer, etc)"
    title: String
    "If the user is an employee, this field will hold the database ID pointing to their employee record"
    employeeId: ID
    phone: String
    "The database ID of the customer (ie company) that the user belongs to"
    customerId: String
    roles: [RoleTypeEnum]
    permissions: [UserPermissionEnum]
    company: Customer
    email: String
    createdByEmail: String
    createdAt: String
    # emails: [EmailRecord]
    companyStatus: String
  }
`;
