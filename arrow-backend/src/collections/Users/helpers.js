import Users from './model';
import moment from 'moment';

const getById = async id => {
  try {
    if (!id) return null;
    // search for inventory item
    let doc = await Users.findOne({_id: id});
    return doc;
  } catch (err) {
    console.log(err);
  }
};

const createNew = async ({newItem, createdBy}) => {
  try {
    let values = {
      ...newItem,
      emails: [
        {
          address: newItem.email,
        },
      ],
      createdAt: moment().valueOf(),
      createdBy,
    };
    if (newItem.email) {
      console.log('update email');
    }
    let newDoc = new Users(values);
    // save the doc
    let updatedItem = await newDoc.save();
    return updatedItem;
  } catch (err) {
    console.log(err);
  }
};

export default {
  createNew,
  removeById: async id => {
    try {
      if (!id) return null;
      // search for inventory item
      let doc = await Users.remove({_id: id});
      return doc;
    } catch (err) {
      console.log(err);
    }
  },
  getById,
};
