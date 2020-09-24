import ReferralReports from 'collections/ReferralReports/model';
import ReferralPartners from 'collections/ReferralPartners/model';

export default async (root, args, {user}) => {
  try {
    // if nobody is logged in, they can't view these reports
    if (!user) throw new Error('You must be logged in to do that');

    // if the user has no roles array, throw an error-- they do not have permission to access these reports
    if (!user.roles) {
      throw new Error('You do not have the correct role to do that');
    }

    // if the user is not a super and not a referral partner, then throw an error
    if (
      !user.roles.includes('superAdmin') &&
      !user.roles.includes('referral')
    ) {
      throw new Error('You do not have the correct role to do that');
    }

    /**
     * Below we're checking to see if we have a partner record that matches the provided partner ID
     */

    let partner = await ReferralPartners.findOne({
      _id: args.partnerId,
    });

    if (!partner || !partner._id) {
      throw new Error('We could not find a Partner by that ID');
    }

    /**
     * if the person trying to view the report is a referral partner,
     * they can only view their own reports. Thus, we will throw an error
     *  if they're trying to view another partners reports.
     * However, superAdmins can view any referral partners reports
     */
    if (user.roles.includes('referral') && user.id !== partner.userId) {
      throw new Error('You can not view other peoples reports');
    }

    let query = {
      partnerId: args.partnerId,
      month: args.month,
      year: args.year,
    };

    let options = {};

    return await ReferralReports.find(query, null, options);

    return [];
  } catch (err) {
    console.log(err);
    return err;
  }
};
