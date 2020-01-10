// COLLECTIONS
import Attachments from 'collections/Attachments/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const getAttachments = async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    // setup query
    let query = {
      customerId: args.customerId,
      type: args.type,
    };

    // setup options for query
    let options = {
      sort: {
        createdAt: -1,
      },
    };

    // return attachments
    return await Attachments.find(query, null, options);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default getAttachments;
