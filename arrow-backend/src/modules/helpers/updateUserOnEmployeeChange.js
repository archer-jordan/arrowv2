import Users from 'collections/Users/model';

const updateUserOnEmployeeChange = async ({currentEmployee, employee}) => {
  // See if we have a user record who has this new email
  let userByEmail = await Users.findOne({
    'emails.0.address': employee.email,
  });

  /*
    If a user was found, and that user does not have an employeeId field yet, 
    then let's update the user record to include employeeId and the employee role.
  */
  if (userByEmail && userByEmail._id && !userByEmail.employeeId) {
    await Users.updateOne(
      {
        _id: userByEmail._id,
      },
      {
        $set: {
          employeeId: currentEmployee._id, // if user by this email exists, then let's add an employee ID to the User record and update their roles to include employee role
          roles: [...userByEmail.roles, 'coEmployee'],
        },
      }
    );
  }

  if (currentEmployee && currentEmployee._id) {
    // if a user exists for this employeeId, update their firstName, lastName and email
    await Users.updateOne(
      {
        employeeId: currentEmployee._id,
      },
      {
        $set: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          emails: [
            {
              address: employee.email,
            },
          ],
        },
      }
    );
  }
};

export default updateUserOnEmployeeChange;
