import Users from 'collections/Users/model';
import canManageUsers from 'modules/helpers/canManageUsers';
import updateEmpoyeeOnUserChange from 'modules/helpers/updateEmpoyeeOnUserChange';

const createUser = async (root, args, context) => {
  //
  let user = {
    ...args.params,
    emails: [{address: args.params.email}],
  };

  let doc = new Users(user);

  // save the new user doc
  await doc.save();

  // make any neccesary updates to employee records
  await updateEmpoyeeOnUserChange({
    newUser: user,
    currentUser: doc,
  });

  return await Users.findOne({
    _id: doc._id,
  });
};

const createNewUser = async (root, args, context) => {
  try {
    // check if user is a super admin
    if (!canManageUsers(context.user)) {
      throw new Error('You do not have permission to do that');
    }
    // only create a user if the user has a superAdmin role
    return createUser(root, args, context);
  } catch (err) {
    return err;
  }
};

export default createNewUser;
