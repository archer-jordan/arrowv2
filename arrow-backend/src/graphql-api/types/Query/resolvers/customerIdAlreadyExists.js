import Customers from 'collections/Customers/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const customerIdAlreadyExists = async (root, args, context) => {
  try {
    // check if user has permission
    userIsSuperAdmin(context.user);
    // find the customer
    let customer = await Customers.findOne({assignedId: args.assignedId});
    console.log({assignedId: args.assignedId, customer});
    if (customer && customer._id) {
      return {
        exists: true,
      };
    }
    return {
      exists: false, // false, no the email does not exist
    };
  } catch (err) {
    console.log(err);
  }
};

export default customerIdAlreadyExists;
