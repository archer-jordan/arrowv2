// COLLECTIONS
import SupportMessages from 'collections/SupportMessages/model';
import mongoose from 'mongoose';
// MODULES
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const supportMessages = async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    // return all messages
    let query = {};

    if (args.status) {
      query.status = args.status;
    }

    if (args.customerId) {
      query.customerId = args.customerId;
    }

    if (args.messageType) {
      query.messageType = args.messageType;
    }

    if (args.searchText) {
      // if searchText exists, we'll do a search by that
      let regex = new RegExp(args.searchText, 'i');
      query = {
        $or: [{email: regex}],
      };

      // if the search text is a valid ID, then we add that to the search
      if (args.searchText && mongoose.Types.ObjectId.isValid(args.searchText)) {
        query['$or'].push({_id: args.searchText});
      }
    }

    let options = {
      limit: args.limit || 5,
      skip: args.skip || 0,
      sort: {
        createdAt: -1,
      },
    };
    let supportMessages = await SupportMessages.find(query, null, options);
    let count = await SupportMessages.find(query).count();
    return {
      supportMessages,
      count,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default supportMessages;
