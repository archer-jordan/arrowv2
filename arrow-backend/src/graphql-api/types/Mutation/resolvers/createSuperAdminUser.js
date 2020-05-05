import Users from 'collections/Users/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';
import moment from 'moment';

const createSuperAdminUser = async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    // throw an error if user is trying to make a super admin with an email other than archerjordan.com
    if (
      args &&
      args.params &&
      !args.params.email.includes('@archerjordan.com')
    ) {
      throw new Error('Super admins must have an archerjordan.com email');
    }

    // create user object
    let user = {
      ...args.params,
      emails: [{address: args.params.email}],
      roles: ['superAdmin'],
      createdAt: moment().valueOf().toString(),
      createdBy: context.user.id,
    };
    // save document
    let doc = new Users(user);
    await doc.save();
    // return the new user record
    return await Users.findOne({
      _id: doc._id,
    });
  } catch (err) {
    return err;
  }
};

export default createSuperAdminUser;
