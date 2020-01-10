import Users from 'collections/Users/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const customerAdmins = async (root, args, context) => {
  // check if user has permission
  userIsSuperAdmin(context.user);

  try {
    if (!args.customerId) return [];
    let customerAdminsUsers = await Users.find({
      customerId: args.customerId,
      roles: {$in: ['coAdmin']},
    });
    return customerAdminsUsers || [];
  } catch (err) {
    return err;
  }
};

export default customerAdmins;
