import moment from 'moment';
import Users from 'collections/Users/model';

export default {
  /********************************************
   * HOOK THAT RUNS FOR EVERY LOGIN ATTEMPT
   ********************************************/
  validateLogin: async ({user}) => {
    if (!user) {
      return false;
    }

    let failedAttempts = (user && user.numLoginAttempts) || 0;
    let lastAttempt = (user && user.lastLoginAttempt) || 0;
    const MAX_ATTEMPTS = 3;
    const LOCKOUT_IN_MINUTES = 15;
    let isTimeLocked = moment()
      .subtract(LOCKOUT_IN_MINUTES, 'minutes')
      .valueOf();

    // if they reached the limit, then we should throw an error and not validate their login
    if (failedAttempts > MAX_ATTEMPTS && lastAttempt > isTimeLocked) {
      throw new Error(
        `For security measures, your account has been locked due to many failed login attempts. Please wait 15 minutes.`
      );
    } else {
      // if the user has no issues with max attempts, we reset numLoginAttempts
      await Users.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            numLoginAttempts: 0,
          },
        }
      );
    }
  },
  /********************************************
   * HOOK THAT RUNS AFTER FAILED LOGIN ATTEMPT
   ********************************************/
  loginError: async ({params, error}) => {
    const {user} = params;

    // if no user exists for this failed login, just return false
    if (!user) return false;

    let userQuery = {'emails.0.address': user.email};

    // if we have a user, find their account
    let userAccount = await Users.findOne(userQuery);

    // if no account exists, ereturn false
    if (!userAccount) return false;

    // figure out the current number of login attemps
    let numLoginAttempts = (userAccount && userAccount.numLoginAttempts) || 0;

    // increment it by one
    numLoginAttempts += 1;

    // update the user record
    await Users.updateOne(userQuery, {
      $set: {
        numLoginAttempts,
        lastLoginAttempt: moment().valueOf(),
      },
    });
  },
};
