import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';
import Users from 'collections/Users/model';
import canManageUsers from 'modules/helpers/canManageUsers';

const makeEmployeeAnAdmin = async (root, args, context) => {
  try {
    if (!canManageUsers(context.user)) {
      throw new Error('You do not have permission to do that');
    }

    /// 1. find the employee user we want to update
    let userToUpdate = await Users.findOne({
      'emails.0.address': args.email,
    });

    if (!userToUpdate || !userToUpdate._id) {
      throw new Error('We can not find that user');
    }

    let dataToUpdate = {
      roles: [...userToUpdate.roles, 'coAdmin'], // add the company admin role
    };

    await Users.updateOne(
      {
        _id: userToUpdate._id,
      },
      {
        $set: dataToUpdate,
      }
    );
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      errors: [err.message],
    };
  }
};

export default makeEmployeeAnAdmin;
