import {gql} from 'apollo-server';
// resolvers
import currentUser from './resolvers/currentUser';
import customers from './resolvers/customers';
import customerById from './resolvers/customerById';
import customerReport from './resolvers/customerReport';
import emailAlreadyExists from './resolvers/emailAlreadyExists';
import customerIdAlreadyExists from './resolvers/customerIdAlreadyExists';
import employees from './resolvers/employees';
import users from './resolvers/users';
import employeeById from './resolvers/employeeById';
import getAttachment from './resolvers/getAttachment';
import getAttachments from './resolvers/getAttachments';
import customerReportsByCustomerId from './resolvers/customerReportsByCustomerId';
import employeeReportByEmployeeId from './resolvers/employeeReportByEmployeeId';
import supportMessages from './resolvers/supportMessages';
import employeeIdAlreadyExists from './resolvers/employeeIdAlreadyExists';
import checkIfEmployeeTotalsExist from './resolvers/checkIfEmployeeTotalsExist';
import customerAdmins from './resolvers/customerAdmins';
import adminUsers from './resolvers/adminUsers';
import adminDocs from './resolvers/adminDocs';
import getCustomerAttachments from './resolvers/getCustomerAttachments';
import systemSettings from './resolvers/systemSettings';
import referralPartnerById from './resolvers/referralPartnerById';
import referralReports from './resolvers/referralReports';

// if your query has a resolver, list it here
export const QueryResolvers = {
  Query: {
    currentUser,
    customers,
    customerReportsByCustomerId,
    customerById,
    customerReport,
    checkIfEmployeeTotalsExist,
    employees,
    employeeById,
    users,
    getAttachment,
    getAttachments,
    employeeReportByEmployeeId,
    supportMessages,
    // exist checks
    employeeIdAlreadyExists,
    emailAlreadyExists,
    customerIdAlreadyExists,
    customerAdmins,
    adminUsers,
    adminDocs,
    getCustomerAttachments,
    systemSettings,
    referralPartnerById,
    referralReports,
  },
};

// list all of your queries here
export const QuerySchema = gql`
  type CustomersResponse {
    "An array of customer objects"
    customers: [Customer]
    "The total number of results your query returned. Used for pagination."
    count: Int
  }
  type EmployeesResponse {
    "An array of Employee objects"
    employees: [Employee]
    "The total number of results your query returned. Used for pagination."
    count: Int
  }

  type UsersResponse {
    "An array of UserProfile objects"
    users: [UserProfile]
    "The total number of results your query returned. Used for pagination."
    count: Int
  }

  type SupportMessagesResponse {
    "An array of SupportMessage objects"
    supportMessages: [SupportMessage]
    "The total number of results your query returned. Used for pagination."
    count: Int
  }

  type ExistsCheckResponse {
    exists: Boolean
    errors: [String]
  }

  enum SortByEnum {
    titleAscend
    titleDescend
    assignedIdDescend
    assignedIdAscend
    statusDescend
    statusAscend
    firstNameAscend
    firstNameDescend
    lastNameAscend
    lastNameDescend
    hireDateAscend
    hireDateDescend
  }

  enum DocSortByEnum {
    ascCreatedAt
    descCreatedAt
    ascFilename
  }

  extend type Query {
    referralReports(
      partnerId: ID!
      month: String
      year: String
    ): [ReferralReport]
    referralPartnerById(id: ID!): ReferralPartner
    systemSettings: SystemSetting
    getCustomerAttachments(type: AttachmentType!): [Attachment]

    "Search through admin uploads. Must be a super admin."
    adminDocs(searchText: String, sortBy: DocSortByEnum): [AdminDoc]

    "Returns the currently signed in user or null if user is not signed in"
    currentUser: UserProfile

    "Provide a customerId (database ID) and get back a customer record"
    customerById(id: ID!): Customer

    customerAdmins(customerId: ID!): [UserProfile]

    "Get back a list of customers. Includes pagination."
    customers(
      searchText: String
      skip: Int
      limit: Int
      sortBy: SortByEnum
    ): CustomersResponse

    "Provide a customerId, month and year to recieve a single customer report from this query"
    customerReport(
      month: String!
      year: String!
      customerId: ID!
    ): CustomerReport

    "Pass in an employee's assigned ID and get back a response telling you if it already exists or not"
    employeeIdAlreadyExists(
      customerId: String!
      assignedId: String!
    ): ExistsCheckResponse

    "Provide an email string and this query will tell you if it already exists in our database (for user accounts). Returns true if it exists and false if it does not exist yet."
    emailAlreadyExists(email: String!): ExistsCheckResponse

    "Provide a customer's assignedId to see if it already exists in our database. Returns true if it exists and false if it does not exist."
    customerIdAlreadyExists(assignedId: String!): ExistsCheckResponse

    "Provided a customer ID (database ID) this query will return a list of employees. Includes pagination."
    employees(
      customerId: String!
      searchText: String
      skip: Int
      limit: Int
      sortBy: SortByEnum
    ): EmployeesResponse

    checkIfEmployeeTotalsExist(
      month: String!
      year: String!
      employeeAssignedIds: [String]
      customerId: String!
    ): ExistsCheckResponse

    "Given an employee ID (database ID), this query returns a single Employee record"
    employeeById(id: ID!): Employee

    "Returns a list of users"
    users(
      searchText: String
      customerId: String
      roles: [String]
      limit: Int
    ): UsersResponse
    adminUsers(searchText: String): UsersResponse

    "Returns a single attachment"
    getAttachment(customerId: ID, type: AttachmentType): Attachment

    "Returns multiple attachments"
    getAttachments(
      customerId: ID
      type: AttachmentType
      searchText: String
      sortBy: DocSortByEnum
    ): [Attachment]

    "Given a customer ID (database ID), this query returns a list of that customer's reports (CustomerReport)"
    customerReportsByCustomerId(customerId: ID!): [CustomerReport]

    "Given an employee ID (database ID) and a month and a year, this query returns a single EmployeeReport"
    employeeReportByEmployeeId(
      employeeId: ID!
      month: String!
      year: String!
    ): EmployeeReport

    "Returns a list of support messages"
    supportMessages(
      skip: Int
      limit: Int
      status: String
      customerId: String
      searchText: String
      messageType: String
    ): SupportMessagesResponse
  }
`;
