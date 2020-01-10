// COLLECTIONS
import SupportMessages from 'collections/SupportMessages/model';
// MODULES
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const supportMessages = async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);
    // return all messages
    return await SupportMessages.find({});
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default supportMessages;
