// // TOP LEVEL IMPORTS
import {merge} from 'lodash';
import {gql} from 'apollo-server';
// // User
import {QueryResolvers, QuerySchema} from './types/Query';
import {MutationSchema, MutationResolvers} from './types/Mutation';
import {UserProfileSchema, UserProfileResolvers} from './types/UserProfile';
import {CustomerSchema, CustomerResolvers} from './types/Customer';
import {EmployeeSchema, EmployeeResolvers} from './types/Employee';
import {
  CustomerReportSchema,
  CustomerReportResolvers,
} from './types/CustomerReport';
import {
  EmployeeReportSchema,
  EmployeeReportResolvers,
} from './types/EmployeeReport';
import {AttachmentSchema, AttachmentResolvers} from './types/Attachment';
import {
  SupportMessageSchema,
  SupportMessageResolvers,
} from './types/SupportMessage';
import {AdminDocSchema, AdminDocResolvers} from './types/AdminDoc';

// merges all of our types into a typeDefs
export const typeDefs = gql`
  ${QuerySchema}
  ${MutationSchema}
  ${UserProfileSchema}
  ${CustomerSchema}
  ${EmployeeSchema}
  ${CustomerReportSchema}
  ${AttachmentSchema}
  ${EmployeeReportSchema}
  ${SupportMessageSchema}
  ${AdminDocSchema}
`;

// merges all our resolvers
export const CustomResolvers = merge(
  QueryResolvers,
  MutationResolvers,
  UserProfileResolvers,
  CustomerResolvers,
  EmployeeResolvers,
  CustomerReportResolvers,
  AttachmentResolvers,
  EmployeeReportResolvers,
  SupportMessageResolvers,
  AdminDocResolvers
);
