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

    if (args.sortBy && args.sortBy === 'ascCreatedAt') {
      options.sort = {createdAt: -1};
    }
    if (args.sortBy && args.sortBy === 'descCreatedAt') {
      options.sort = {createdAt: 1};
    }
    if (args.sortBy && args.sortBy === 'ascFilename') {
      options.sort = {filename: 1};
    }

    if (args.searchText) {
      let regex = new RegExp(args.searchText, 'i');
      query.filename = regex;
    }

    // return attachments
    return await Attachments.find(query, null, options);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default getAttachments;
