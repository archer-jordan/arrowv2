import ReferralPartners from 'collections/ReferralPartners/model';
import Users from 'collections/Users/model';
import moment from 'moment';
import {generateRandomToken} from '@accounts/server';
import emailTransporter from 'modules/email.js';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const setUser = ({email, token}) => {
  return {
    emails: [
      {
        address: email,
      },
    ],
    roles: ['referral'],
    services: {
      password: {
        reset: [
          {
            token,
            reason: 'reset',
            when: moment().valueOf(),
            address: email,
          },
        ],
      },
    },
  };
};

const checkIfUserExists = async ({email}) => {
  // make sure account doesn't already exist
  let userExists = await Users.findOne({
    'emails.0.address': email,
  });

  if (userExists && userExists._id) {
    throw new Error('A user with that email already exists in the system');
  }
  // if the user does not exist, just return
  return;
};

const sendInviteEmail = async ({token, email}) => {
  // send them an invite email
  let sitUrl =
    process.env.NODE_ENV === 'local'
      ? 'http://localhost:3000'
      : process.env.SITE_URL;
  let createAccountURL = `${sitUrl}/register-partner/${token}`;
  await emailTransporter.sendMail({
    to: email,
    from: `ARROW <${process.env.CONSTANTS_SEND_EMAIL}>`,
    subject: `Create your arrow partner account`,
    html: `Please <a href="${createAccountURL}">click here</a> to create a password and log-in to your account.`,
  });
};

export default async (root, {email}, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    // check if the user already exists
    await checkIfUserExists({email});

    // create user account
    let token = await generateRandomToken();

    // update the user
    let user = setUser({email, token});
    let userDoc = new Users(user);
    await userDoc.save();

    // create ReferralPartner record
    let partnerDoc = new ReferralPartners({
      userId: userDoc._id,
      applicationSubmittedDate: moment().valueOf(),
      status: 'pending',
    });
    //
    await partnerDoc.save();

    sendInviteEmail({token, email});

    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
