import ReferralPartners from 'collections/ReferralPartners/model';
import Users from 'collections/Users/model';

const setValuestoSave = (params, user) => {
  let referralValues = {
    ...params,
  };

  // we want to add a partnerId field to each document that holds the user's ID... used later to determine who uploaded it and restrict access to the document
  if (referralValues.w9Doc) {
    referralValues.w9Doc = {
      ...referralValues.w9Doc,
      partnerId: user.id,
    };
  }

  if (referralValues.achDoc) {
    referralValues.achDoc = {
      ...args.params.achDoc,
      partnerId: user.id,
    };
  }

  if (referralValues.parterAgreementDoc) {
    referralValues.parterAgreementDoc = {
      ...referralValues.parterAgreementDoc,
      partnerId: user.id,
    };
  }

  // delete the user values from the referral values that we'll update
  delete referralValues.firstName;
  delete referralValues.lastName;
  delete referralValues.email;

  return referralValues;
};

const setUserValues = (params) => {
  let userValues = {};

  if (params.firstName) {
    userValues.firstName = params.firstName;
  }
  if (params.lastName) {
    userValues.lastName = params.lastName;
  }

  if (params.email) {
    userValues.values = [
      {
        address: params.email,
      },
    ];
  }

  return userValues;
};

const saveReferralPartner = async (root, args, context) => {
  try {
    // check permissions
    if (!context.user) {
      throw new Error('You must be signed in to call this function');
    }

    if (
      !context.user.roles.includes('referral') &&
      !context.user.roles.includes('superAdmin')
    ) {
      throw new Error('You do not have the proper role to edit this record');
    }

    let existing = await ReferralPartners.findOne({
      _id: args.id,
    });

    if (!existing && !existing._id) {
      throw new Error('We can not find a record with that ID');
    }

    let referralValues = setValuestoSave(args.params, context.user);

    let userValues = setUserValues(args.params);

    // some values are saved on the user (first name, last name, email), while other referral-specific details are saved on a separate referral partner record
    await Users.updateOne(
      {
        _id: existing.userId,
      },
      {
        $set: {
          ...userValues,
        },
      }
    );

    await ReferralPartners.updateOne(
      {
        _id: args.id,
      },
      {
        $set: {
          ...referralValues,
        },
      }
    );

    let newVersion = await ReferralPartners.findOne({
      _id: args.id,
    });

    return newVersion;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default saveReferralPartner;
