import ReferralPartners from 'collections/ReferralPartners/model';
import Users from 'collections/Users/model';
import moment from 'moment';
import {generateRandomToken} from '@accounts/server';
import emailTransporter from 'modules/email.js';

export default async (root, args) => {
  try {
    // make sure account doesn't already exist
    let userExists = await Users.findOne({
      'emails.0.address': args.email,
    });

    if (userExists && userExists._id) {
      return {
        success: false,
        errors: ['A user with that email already exists in the system'],
      };
    }

    // create user account
    let token = await generateRandomToken();

    let user = {
      emails: [
        {
          address: args.email,
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
              address: args.email,
            },
          ],
        },
      },
    };
    let userDoc = new Users(user);
    await userDoc.save();
    // create ReferralPartner record
    let referralPartner = {
      userId: userDoc._id,
      applicationSubmittedDate: moment().valueOf(),
      status: 'pending',
    };
    let partnerDoc = new ReferralPartners(referralPartner);
    await partnerDoc.save();

    // send them an invite email
    let sitUrl =
      process.env.NODE_ENV === 'local'
        ? 'http://localhost:3000'
        : process.env.SITE_URL;
    let createAccountURL = `${sitUrl}/register-partner/${token}`;

    await emailTransporter.sendMail({
      to: args.email,
      from: `ARROW <${process.env.CONSTANTS_SEND_EMAIL}>`,
      subject: `Create your arrow partner account`,
      html: `Please <a href="${createAccountURL}">click here</a> to create a password and log-in to your account.`,
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
