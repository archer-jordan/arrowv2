import Users from 'collections/Users/model';
import moment from 'moment';
import canManageUsers from 'modules/helpers/canManageUsers';
import updateEmpoyeeOnUserChange from 'modules/helpers/updateEmpoyeeOnUserChange';

const saveUser = async (root, {id, params}, context) => {
  try {
    if (!canManageUsers(context.user)) {
      throw new Error('You do not have permission to do that');
    }

    if (!id) {
      throw new Error('Please provide an ID');
    }

    let existingItem = await Users.findOne({_id: id});

    // if no record exists, throw an error
    if (!existingItem) {
      throw new Error('No user for the ID provided');
    }

    // item exists, then update it
    if (existingItem) {
      // if an email was passed, let's shape it correctly for our params
      if (params.email) {
        params.emails = [
          {
            address: params.email,
          },
        ];
      }

      // actually update the user record
      await Users.updateOne(
        {_id: existingItem._id},
        {
          $set: {
            ...params,
            updatedBy: context.user && context.user.id, // mark who updated it
            updatedAt: moment().valueOf(), // mark when it was last updated
          },
        }
      );

      // make any neccesary updates to employee records
      await updateEmpoyeeOnUserChange({
        newUser: params,
        currentUser: existingItem,
      });

      // return the updated user
      return await Users.findOne({
        _id: existingItem._id,
      });
    }
  } catch (err) {
    return err;
  }
};

export default saveUser;
