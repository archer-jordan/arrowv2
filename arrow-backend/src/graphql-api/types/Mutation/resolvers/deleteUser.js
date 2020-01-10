import helpers from 'collections/Users/helpers';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const deleteUser = async (root, {id}, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);
    // only allow a delete if the user has a superAdmin role
    if (context.user.roles.includes('superAdmin')) {
      await helpers.removeById(id);
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};

export default deleteUser;
