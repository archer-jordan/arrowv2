import {gql} from 'apollo-server';
import Customers from 'collections/Customers/model';

export const SupportMessageResolvers = {
  SupportMessage: {
    id: root => root._id,
    customer: async root => await Customers.findOne({_id: root.customerId}),
  },
};

export const SupportMessageSchema = gql`
  enum SupportMessageTypeEnum {
    "how to use it"
    software
    "how to access them"
    benefits
    "my monthly reports"
    data
    "update my info"
    account
  }

  enum SupportStatusEnum {
    open
    closed
  }

  input SupportMessageParams {
    name: String
    email: String!
    subject: String
    message: String
    customerId: String!
    messageType: SupportMessageTypeEnum!
    status: SupportStatusEnum
    userId: String!
  }

  type SupportMessage {
    id: String
    name: String
    email: String
    "The subject line for the message"
    subject: String
    "The body/message of the support request"
    message: String
    userId: String
    createdAt: String
    customer: Customer
    messageType: SupportMessageTypeEnum
    status: SupportStatusEnum
  }
`;
