import Customers from 'collections/Customers/model';

const setSortBy = (sortBy, options) => {
  if (sortBy === 'titleAscend') {
    options.sort = {
      title: 1,
    };
  }
  if (sortBy === 'titleDescend') {
    options.sort = {
      title: -1,
    };
  }
  if (sortBy === 'assignedIdAscend') {
    options.sort = {
      assignedId: 1,
    };
  }
  if (sortBy === 'assignedIdDescend') {
    options.sort = {
      assignedId: -1,
    };
  }
  if (sortBy === 'statusAscend') {
    options.sort = {
      status: 1,
    };
  }
  if (sortBy === 'statusDescend') {
    options.sort = {
      status: -1,
    };
  }
  return options;
};

const customersQuery = async (
  root,
  {searchText, limit, skip, sortBy},
  {user}
) => {
  if (!user.roles || !user.roles.includes('superAdmin')) {
    throw new Error('You must be an admin to do that');
  }

  let query = {};

  // set the default options
  let options = {
    limit: limit || 5,
    skip: skip || 0,
  };

  // if a sortBy is provided, we'll figure that out
  if (sortBy) {
    options = setSortBy(sortBy, options);
  }

  if (searchText) {
    let regex = new RegExp(searchText, 'i');
    query = {
      $or: [{title: regex}, {assignedId: regex}],
    };
  }

  let customers = await Customers.find(query, null, options).collation({
    locale: 'en',
    strength: 2,
  });

  let count = await Customers.countDocuments(query);

  return {
    customers,
    count,
  };
};

export default customersQuery;
