import Attachments from 'collections/Attachments/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const deleteAttachment = async (root, {id}, context) => {
  try {
    // check if user is logged in
    userIsSuperAdmin(context.user);

    await Attachments.remove({_id: id});
  } catch (err) {
    console.log(err);
  }
};

export default deleteAttachment;
