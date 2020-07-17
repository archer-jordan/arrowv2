import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';
import AdminDocs from 'collections/AdminDocs/model';

const deleteAdminDoc = async (roots, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    await AdminDocs.remove({
      _id: args.id,
    });
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};

export default deleteAdminDoc;
