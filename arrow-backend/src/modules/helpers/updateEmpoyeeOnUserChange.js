import Users from 'collections/Users/model';
import Employees from 'collections/Employees/model';

const updateEmpoyeeOnUserChange = async ({newUser, currentUser}) => {
  try {
    /*
    if the user currently does not have an employeeId, 
    let's make sure they don't have an employee record 
    already based on their email. If they do, we'll want 
    to update the user record so it's assocaited to the 
    relevant employee record
  */
    let email = newUser.email || newUser.emails[0].address;

    // see if employeeId exists
    if (currentUser && !currentUser.employeeId) {
      // search for an employee with this email
      let employeeByEmail = await Employees.findOne({
        email,
      });

      // if an employee record with this email exists, add an employeeId to the USER record and update last name/first name
      if (employeeByEmail && employeeByEmail._id && employeeByEmail._id) {
        await Users.updateOne(
          {_id: currentUser._id},
          {
            $set: {
              employeeId: employeeByEmail._id,
              firstName: newUser.firstName || employeeByEmail.firstName,
              lastName: newUser.lastName || employeeByEmail.lastName,
              roles: [...currentUser.roles, 'coEmployee'],
            },
          }
        );

        // lets also update the employee record
        await Employees.updateOne(
          {
            _id: employeeByEmail._id,
          },
          {
            $set: {
              email,
              firstName: newUser.firstName || employeeByEmail.firstName,
              lastName: newUser.lastName || employeeByEmail.lastName,
            },
          }
        );
      }
    }

    // if user has an employeeID, update the employee firstName and lastName and email
    if (currentUser && currentUser.employeeId) {
      await Employees.updateOne(
        {
          _id: currentUser.employeeId,
        },
        {
          $set: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default updateEmpoyeeOnUserChange;
