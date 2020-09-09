import {gql} from 'apollo-server';

export const SystemSettingResolvers = {
  SystemSetting: {
    id: (root) => root._id, // mongo uses _id as the primary key field, for simplifying the UI we change this to be just id
  },
};

export const SystemSettingSchema = gql`
  type SystemSetting {
    id: String
    minimumReferralHours: Int
    referralRate: Int
  }
`;
