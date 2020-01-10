import Customers from 'collections/Customers/model';
import CustomerReports from 'collections/CustomerReports/model';
import moment from 'moment';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const customerTotalsUpload = async (root, {values}, context) => {
  try {
    // Check permissions
    userIsSuperAdmin(context.user);

    // find the customer we're updating
    let customer = await Customers.findOne({assignedId: values.assignedId});

    if (!customer || !customer._id) {
      throw new Error('We can not find that customer in our database');
    }

    // check if
    let exists = await CustomerReports.findOne({
      customerId: customer._id,
      month: values.month,
      year: values.year,
    });

    if (exists && exists._id) {
      await CustomerReports.updateOne(
        {
          _id: exists._id,
        },
        {
          $set: {
            ...values,
            updatedAt: moment().valueOf(),
            updatedBy: context.user.id,
          },
        }
      );
      return {
        success: true,
      };
    }

    let newReport = {
      ...values,
      customerId: customer._id,
      createdAt: moment().valueOf(),
      createdBy: context.user.id,
    };
    // add the benefits array. Make sure we don't add any empty benefits column by filtering based on empty label field
    newReport.benefits = newReport.benefits.filter(item => item.label);
    let doc = new CustomerReports(newReport);
    await doc.save();
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

export default customerTotalsUpload;
