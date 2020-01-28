import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';
import SupportMessages from 'collections/SupportMessages/model';

const updateSupportStatus = async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    //
    if (args.id) {
      console.log(args);
      await SupportMessages.updateOne(
        {
          _id: args.id,
        },
        {
          $set: {
            status: args.status,
          },
        }
      );
    }

    // return updated doc
    return await SupportMessages.findOne({
      _id: args.id,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default updateSupportStatus;
