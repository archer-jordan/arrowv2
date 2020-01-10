import Customers from 'collections/Customers/model';
import moment from 'moment';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const saveCustomer = async (root, {id, params}, context) => {
  try {
    // check permissions
    userIsSuperAdmin(context.user);
    // check if user is logged in
    if (!context.user || !context.user.id) {
      throw new Error('You are not logged in');
    }

    // if no id was passed in, create a new item
    let newItem = {
      ...params,
      updatedBy: context.user && context.user.id,
      updatedAt: moment().valueOf(),
    };

    let existingItem;

    if (!id) {
      existingItem = await Customers.findOne({assignedId: params.assignedId});
      console.log(existingItem);
      if (existingItem && existingItem._id) {
        throw new Error('ID already exists');
      }

      // create new customer
      newItem.createdBy = context.user.id;
      newItem.status = 'pending';
      let newCustomer = new Customers(newItem);
      let newDoc = await newCustomer.save();
      return await Customers.findOne({_id: newDoc._id});
    }

    // if an id was passed in, check to see if a record exists for it.
    existingItem = await Customers.findOne({_id: id});

    // if no record exists, create a new item
    if (!existingItem) {
      return null;
      // create new customer
    }
    // item exists, then update it
    if (existingItem) {
      await Customers.updateOne({_id: id}, {$set: {...params}});
      return await Customers.findOne({_id: id});
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default saveCustomer;
