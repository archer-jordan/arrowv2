import SystemSettings from 'collections/SystemSettings/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

export default async (root, args, context) => {
  try {
    // check permissions
    userIsSuperAdmin(context.user);
    let settings = await SystemSettings.find();
    let setting = settings[0];
    return setting;
  } catch (err) {
    console.log(err);
  }
};
