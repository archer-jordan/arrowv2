import SystemSettings from 'collections/SystemSettings/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const saveSystemSettings = async (root, args, context) => {
  try {
    // check permissions
    userIsSuperAdmin(context.user);

    let settings = await SystemSettings.find();
    let settting = settings[0];
    await SystemSettings.updateOne(
      {
        _id: settting._id,
      },
      {
        $set: {
          ...args,
        },
      }
    );
    // udpate doc
    let newSettings = await SystemSettings.find();
    return newSettings[0];
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default saveSystemSettings;
