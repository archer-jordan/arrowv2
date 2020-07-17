import {gql} from 'apollo-server';
import s3 from 'modules/s3';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

export const AdminDocResolvers = {
  AdminDoc: {
    id: (root) => root._id, // mongo uses _id as the primary key field, for simplifying the UI we change this to be just id
    url: async (root, args, context) => {
      try {
        // do some user permission checks
        if (!context.user || !context.user.id) return null;
        userIsSuperAdmin(context.user);

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

export const AdminDocSchema = gql`
  type AdminDoc {
    id: String
    filename: String
    mimetype: String
    url: String
    key: String
  }
`;
