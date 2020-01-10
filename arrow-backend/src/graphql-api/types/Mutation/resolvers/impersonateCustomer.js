import Users from 'collections/Users/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

// We will store a customerId on the admin account so that when they go to view that area of the application,
// they will then be able to go to that user's account

const impersonateCustomer = async (root, args, {user}) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(user);

    /*
      if turnOff is false, then we will update the current users record to
      include a customerId, which will let them view the company dashboard
    */
    if (!args.turnOff && user && user.id) {
      await Users.updateOne(
        {
          _id: user.id,
        },
        {
          $set: {
            customerId: args.customerId,
          },
        }
      );
    } else {
      /*
        if turnOff is true, then we will remove the customerId from the admin's user record, 
        which will remove their ability to view the given company's dashbaord
      */
      await Users.updateOne(
        {
          _id: user.id,
        },
        {
          $set: {
            customerId: null,
          },
        }
      );
    }

    // if all goes well, return a success field of true
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

export default impersonateCustomer;
