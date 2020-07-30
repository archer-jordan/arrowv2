import Attachments from 'collections/Attachments/model';
import moment from 'moment';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const saveAttachment = async (root, {id, params}, context) => {
  try {
    // check permissions
    userIsSuperAdmin(context.user);
    let newAttachment = {
      filename: params.filename,
      url: params.url,
      customerId: params.customerId,
      type: params.type,
      createdAt: moment().valueOf(),
      key: params.key,
    };
    let doc = new Attachments(newAttachment);
    await doc.save();
    return await Attachments.findOne({_id: doc._id});
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default saveAttachment;
