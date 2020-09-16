import {gql} from 'apollo-server';
import s3 from 'modules/s3';

export const AttachmentResolvers = {
  Attachment: {
    // mongo uses _id as the primary key field, for simplifying the UI we change this to be just id
    id: (root) => root._id,
    url: async (root, args, context) => {
      // 'EmployeeUploads', if EmployeeUploads, user must be a super admin
      // 'CustomerReportUploads', if CustomerReportUploads, user must be a super admin or company admin. If company admin, it must be
      // 'EmployeeReportsUploads',
      // 'CustomerUpload',
      // 'CustomerPlan',
      // 'EmployeePlan',
      try {
        if (!context.user || !context.user.id) return null;
        if (!root.key) return null;
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: root.key,
          Expires: 600, // 10 minutes
        };
        const url = await s3.getSignedUrlPromise('getObject', params);
        return url;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export const AttachmentSchema = gql`
  input AttachmentParams {
    filename: String
    url: String
    mimetype: String
    customerId: String
    key: String!
    type: AttachmentType
    encoding: String
  }

  enum AttachmentType {
    "general uploads for a customer… CRM-esque feature"
    CustomerUpload
    "Documents viewable by employees"
    EmployeeDoc
    "Documents viewable by company employees"
    CompanyAdminDoc
    "Documents related to a referral partner"
    ReferralPartnerDoc
  }

  type Attachment {
    id: String
    filename: String
    mimetype: String
    url: String
    key: String
    customerId: String
    type: AttachmentType
  }
`;
