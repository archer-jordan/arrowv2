import Customers from 'collections/Customers/model';

export default async (
  root,
  {customerId, referralPartnerId, referralStartDate, referralEndDate}
) => {
  try {
    await Customers.updateOne(
      {
        _id: customerId,
      },
      {
        referralPartnerId, // the ReferralPartner _id for this customer (if one exists)
        referralStartDate,
        referralEndDate,
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
