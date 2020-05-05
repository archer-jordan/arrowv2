import Users from 'collections/Users/model';

const checkIfUserHasPersmission = ({user}) => {
  // must be an superAdmin or coAdmin
  if (!user || !user._id) {
    throw new Error('You must be logged in to query users');
  }

  // must be an superAdmin or coAdmin
  if (
    !user ||
    !user.roles ||
    !user.roles.length === 0 ||
    !user.roles.includes('superAdmin')
  ) {
    throw new Error('You must be a superAdmin or coAdmin to query admin users');
  }
};

const generateQuery = ({searchText}) => {
  let query = {
    roles: {$in: ['superAdmin']},
  };

  if (searchText) {
    let regex = new RegExp(searchText, 'i');
    let orQuery = {
      $or: [{firstName: regex}, {lastName: regex}, {'emails.address': regex}],
    };
    query = {
      $and: [query, orQuery],
    };
  }

  return query;
};

const adminUsers = async (root, {searchText}, context) => {
  try {
    // make sure user has permission... will throw error if they dont
    checkIfUserHasPersmission({user: context.user});

    let query = generateQuery({searchText});

    // if super admin is trying to see all super admins, we'll do this query
    if (context.user.roles.includes('superAdmin')) {
      let users = await Users.find(query);
      let count = await Users.countDocuments(query);
      return {
        users,
        count,
      };
    }

    return {
      users: [],
      count: 0,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default adminUsers;
