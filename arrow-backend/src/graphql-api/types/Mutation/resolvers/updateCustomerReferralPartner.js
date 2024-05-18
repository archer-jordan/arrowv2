import Customers from 'collections/Customers/model';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

export default async (
  root,
  {
    customerId,
    referralPartnerId,
    referralStartDate,
    referralEndDate,
    minimumReferralHours,
    referralRate,
  },
  context
) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    await Customers.updateOne(
      {
        _id: customerId,
      },
      {
        referralPartnerId, // the ReferralPartner _id for this customer (if one exists)
        referralStartDate,
        referralEndDate,
        minimumReferralHours,
        referralRate,
      }
    );

    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
