import {gql} from 'apollo-server';

export const SupportMessageResolvers = {
  SupportMessage: {
    id: root => root._id,
  },
};

export const SupportMessageSchema = gql`
  input SupportMessageParams {
    name: String
    email: String!
    subject: String
    message: String!
    customerId: String!
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
  }
`;
