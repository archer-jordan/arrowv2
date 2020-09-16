import cron from 'node-cron';
import Users from 'collections/Users/model';

/**
 * This chron job will run periodically to make sure that we never have users where role = superAdmin and their email is not an archerjordan.com email
 */

const WHITE_LIST_EMAILS = ['arcomito+admin@gmail.com'];

const ADMIN_DOMAIN = '@archerjordan.com';

// only run cron jobs if we're in production environment

if (process.env.NODE_ENV === 'production') {
  // will run this chron job every 2 hours
  cron.schedule('0 0 */2 * * *', async () => {
    // find all super admin users
    let superAdmins = await Users.find({
      roles: {$in: ['superAdmin']},
    });

    // if we got an array back of super admins, let's do work on that array.
    if (superAdmins && superAdmins.length && superAdmins.length > 0) {
      // for each over each item in the array
      superAdmins.forEach(async (admin) => {
        // grab the users email
        let email = admin.emails && admin.emails[0] && admin.emails[0].address;
        /**
         * if the email exists AND the email does not include the ADMIN_DOMAIN,
         * then we want to remove the super admin role from that user
         */
        if (email && !email.includes(ADMIN_DOMAIN)) {
          // if the email does not have an archerjordan domain, check if the email is on our white list
          if (!WHITE_LIST_EMAILS.includes(email)) {
            // if it's not on the white list, then we wantt to remove the super admin role
            console.log(`Remove the super admin role from ${email}`);
            console.log(admin.roles.filter((item) => item !== 'superAdmin'));
            // actually remove the super admin roles
            await Users.updateOne(
              {
                _id: admin._id,
              },
              {
                $set: {
                  roles: admin.roles.filter((item) => item !== 'superAdmin'),
                },
              }
            );
          }
        }
      });
    }
  });
}
