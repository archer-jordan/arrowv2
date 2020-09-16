import ReferralPartners from 'collections/ReferralPartners/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

export default async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    let profile = await ReferralPartners.findOne({
      _id: args.id,
    });

    return profile;
  } catch (err) {
    return err;
  }
};
