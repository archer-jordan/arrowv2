import Customers from 'collections/Customers/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const customerById = async (root, {id}, context) => {
  if (!context.user) return null;
  if (!context.user.roles) return null;
  if (!context.user.roles.length) return null;
  if (context.user.roles.length === 0) return null;
  // only return the ssn if the user has a superAdmin role
  if (
    !context.user.roles.includes('superAdmin') &&
    !context.user.roles.includes('coEmployee') &&
    !context.user.roles.includes('coAdmin')
  ) {
    return null;
  }
  let customer = await Customers.findOne({_id: id});
  return customer;
};

export default customerById;
