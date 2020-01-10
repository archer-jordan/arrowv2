import {generateRandomToken} from '@accounts/server';
import Employees from 'collections/Employees/model';
import Users from 'collections/Users/model';
import emailTransporter from 'modules/email.js';
import moment from 'moment';

/**
 * createUser -> if a user tries to register (presumably an employee) and we
 * don't have a Users record created for that user yet, this function
 * 1. will check for the email using the provdided email
 * 2. if we find the employee, will then create a user record for them
 */
const createUser = async email => {
  try {
    // find the employee who is trying to signup
    let employee = await Employees.findOne({email});
    // if we can not find the employee record, then throw an error
    if (!employee || !employee._id) {
      throw new Error('No user exists for this email');
    }
    // if the employee record exists, then we'll create the user object
    const newUser = {
      emails: [
        {
          address: email,
        },
      ],
      employeeId: employee._id,
      customerId: employee.customerId,
      roles: ['coEmployee'],
    };
    // insert the new user object relate to the employee who is trying to sign up
    let doc = new Users(newUser);
    // save document
    await doc.save();
    // get the updated record and return it
    return await Users.findOne({_id: doc._id});
  } catch (err) {
    console.log(err);
    throw new Error('Could not create a new user');
  }
};

/**
 * sendEmail -> sends an email to the user
 */
const sendEmail = async ({email, token}) => {
  // figure out the URL we want to use based on environment (local, development, staging, production, etc)
  let sitUrl =
    process.env.NODE_ENV === 'local'
      ? 'http://localhost:3000'
      : process.env.SITE_URL;
  let url = `${sitUrl}/register-account/${token}`;
  console.log({
    url,
  });
  // send the email
  await emailTransporter.sendMail({
    to: email,
    from: `ARROW <${process.env.CONSTANTS_SEND_EMAIL}>`,
    subject: 'Set your password',
    html: `Please <a href="${url}">click here</a> to create a password and log-in to your Arrow Administrative account.`,
  });
};

/**
 * Registering your account involves creating a password.
 * The user technically will already have had their
 * account created by the super admin.
 */

const registerAccount = async (root, args, context) => {
  try {
    // confirm that we have a user by the email
    let user = await Users.findOne({'emails.address': args.email});

    // if no user exists, such as the case of an employee signing in for the first time, we'll create their account
    if (!user || !user._id) {
      user = await createUser(args.email);
    }

    // create a reset token using accounts-js
    let token = await generateRandomToken();
    // we'll need to update the user record with the below data/object
    let update = {
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
    // update the user's record with the reset token, which we'll also use in the URL we send them (see futher down)
    await Users.updateOne({_id: user._id}, {$set: update});
    // send a password reset email to the user
    sendEmail({email: args.email, token});
    // return a successful response to the client
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      errors: [err.message],
    };
  }
};

export default registerAccount;
