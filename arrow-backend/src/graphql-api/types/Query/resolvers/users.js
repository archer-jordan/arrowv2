import Users from 'collections/Users/model';

const checkIfUserHasPersmission = ({user, customerId}) => {
  // must be an superAdmin or coAdmin
  if (!user || !user._id) {
    throw new Error('You must be logged in to query users');
  }

  // must be an superAdmin or coAdmin
  if (
    !user ||
    !user.roles ||
    !user.roles.length === 0 ||
    (!user.roles.includes('coAdmin') && !user.roles.includes('superAdmin'))
  ) {
    throw new Error('You must be a superAdmin or coAdmin to query users');
  }

  // if this is a company admin, they can only query their own company's data
  if (user.roles.includes('coAdmin') && customerId !== user.customerId) {
    throw new Error('Company admins can only view data from their own company');
  }
};

const generateQuery = ({customerId, searchText, roles = []}) => {
  let query = {
    customerId: customerId,
    roles: {$in: ['coAdmin']},
  };

  if (roles && roles.length && roles.length > 0) {
    query.roles = {$in: roles};
  }

  if (searchText) {
    let regex = new RegExp(searchText, 'i');
    let orQuery = {
      $or: [
        {firstName: regex},
        {lastName: regex},
        {'emails.address': regex},
        {_id: regex},
      ],
    };

    query = {
      $and: [query, orQuery],
    };
  }
  return query;
};

const usersQuery = async (
  root,
  {customerId, searchText, roles, limit},
  context
) => {
  try {
    let option = {};

    if (limit) {
      option.limit = limit;
    }

    // make sure user has permission... will throw error if they dont
    checkIfUserHasPersmission({user: context.user, customerId});

    let query = generateQuery({customerId, searchText, roles});

    // if super admin is trying to see all super admins, we'll do this query
    if (context.user.roles.includes('superAdmin') && roles) {
      query.roles = {$in: roles};
      let users = await Users.find(query);
      let count = await Users.countDocuments(query);
      return {
        users,
        count,
      };
    }

    let users = await Users.find(query, null, option);
    let count = await Users.countDocuments(query);

    return {
      users,
      count,
    };
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export default usersQuery;
