import {gql} from 'apollo-server';

export * from './resolvers';

export const MutationSchema = gql`
  type MutationResponse {
    success: Boolean
    errors: [String]
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String
    key: String!
  }

  input EmpoyeeUploadCheckParams {
    email: String
    companyAssignedId: String
    employeeAssignedId: String
  }

  extend type Mutation {
    deleteAdminDoc(id: ID!): MutationResponse
    uploadAdminDoc(file: Upload!): AdminDoc

    deleteEmployee(employeeId: ID!): MutationResponse
    "Create a user account"
    createNewUser(params: UserParams): UserProfile

    "Save data on a user account. Pass in the id of user you want to update."
    saveUser(id: ID!, params: UserParams): UserProfile

    "Delete a user account."
    deleteUser(id: ID): UserProfile

    "Save or create a customer record. If no ID is passed, customer is created. If an ID is passed, the given customer record is updated."
    saveCustomer(id: ID, params: CustomerParams): Customer

    "Provide an email and we'll send a signup link to it (if email exists)."
    registerAccount(email: String!): MutationResponse

    "Upload a list of employees to add them to the database"
    newEmployeesUpload(
      customerId: ID!
      employees: [EmployeeParams]
    ): MutationResponse

    "Update existing employees by uploading a list of employees"
    updateEmployeesUpload(
      customerId: ID!
      employees: [EmployeeParams]
    ): MutationResponse

    makeEmployeeAnAdmin(email: String!): MutationResponse

    "Save or create a employee record. If no ID is passed, employee is created. If an ID is passed, the given employee record is updated."
    saveEmployee(id: ID, params: EmployeeParams): Employee

    customerTotalsUpload(values: CustomerReportParams): MutationResponse

    "Impersonate a customer by providing a customerId"
    impersonateCustomer(customerId: String!, turnOff: Boolean): MutationResponse

    "This mutation takes an an array of emails and company IDs (just email and company assigned id and employee assigned id) and will do a check to see if any of them already exist already in the DB"
    checkEmployeesCSV(values: [EmpoyeeUploadCheckParams]): MutationResponse

    "Upload a file to AWS"
    singleUpload(file: Upload!): File!

    deleteCustomer(customerId: ID!): MutationResponse

    "Save an attachment in our DB"
    saveAttachment(id: ID, params: AttachmentParams): Attachment

    "Delete an attachment from our DB (but not AWS)"
    deleteAttachment(id: ID!): MutationResponse

    "Upload a list of employee reports"
    uploadEmployeeReports(values: [EmployeeReportParams]): MutationResponse

    "Send a support message. Sends an email to support and logs a record in SupportMessages DB."
    sendSupportMessage(params: SupportMessageParams): MutationResponse

    "Only a super admin can call this resolver."
    createSuperAdminUser(params: UserParams): UserProfile

    "Update a support ticket/request"
    updateSupportStatus(id: String!, status: String!): SupportMessage
  }
`;
