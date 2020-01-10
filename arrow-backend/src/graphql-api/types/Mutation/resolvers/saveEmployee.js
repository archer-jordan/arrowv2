import Employees from 'collections/Employees/model';
import moment from 'moment';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';
import updateUserOnEmployeeChange from 'modules/helpers/updateUserOnEmployeeChange';

const saveEmployee = async (root, {id, params}, context) => {
  try {
    // check permissions
    userIsSuperAdmin(context.user);

    if (!id) {
      throw new Error('We can not find the employee record');
    }

    // if an id was passed in, check to see if a record exists for it.
    let existingItem = await Employees.findOne({_id: id});

    // if no record exists, create a new item
    if (!existingItem) {
      throw new Error('We can not find the employee record');
    }

    // item exists, then update it
    if (existingItem) {
      let newData = {
        ...params,
        updatedBy: context.user && context.user.id,
        updatedAt: moment().valueOf(),
      };

      // update the employee record
      await Employees.updateOne(
        {_id: id},
        {
          $set: newData,
        }
      );

      await updateUserOnEmployeeChange({
        currentEmployee: existingItem,
        employee: newData,
      });

      // search for the new record and return it
      return await Employees.findOne({_id: id});
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default saveEmployee;
