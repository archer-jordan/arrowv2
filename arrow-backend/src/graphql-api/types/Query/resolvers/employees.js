import Employees from 'collections/Employees/model';

const setSortBy = (sortBy, options) => {
  if (sortBy === 'firstNameAscend') {
    options.sort = {
      firstName: 1,
    };
  }
  if (sortBy === 'firstNameDescend') {
    options.sort = {
      firstName: -1,
    };
  }
  if (sortBy === 'lastNameAscend') {
    options.sort = {
      lastName: 1,
    };
  }
  if (sortBy === 'lastNameDescend') {
    options.sort = {
      lastName: -1,
    };
  }
  if (sortBy === 'hireDateAscend') {
    options.sort = {
      hireDate: 1,
    };
  }
  if (sortBy === 'hireDateDescend') {
    options.sort = {
      hireDate: -1,
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

  return options;
};

const checkPermissions = (user, customerId) => {
  if (!user) throw new Error('You must be logged in to query getAttachment');
  if (!user.id) throw new Error('You must be logged in to query getAttachment');
  if (!user.roles)
    throw new Error('You must have a role to query getAttachment');
  if (user.roles.length === 0)
    throw new Error('You must have a role to query getAttachment');

  // if this is a company admin, they can only query their own company's data
  if (user.roles.includes('coAdmin') && customerId !== user.customerId) {
    throw new Error('Company admins can only view data from their own company');
  }
  // Check permission
  if (
    user.roles.includes('coAdmin') &&
    !user.permissions.includes('viewEmployeeData')
  ) {
    throw new Error('You do not have permissions to query employee data');
  }
};

const employeesQuery = async (
  root,
  {customerId, searchText, skip, limit, sortBy},
  context
) => {
  // TODO: check user roles and permissions
  checkPermissions(context.user, customerId);

  // create the query
  let query = {
    customerId,
  };

  // setup our defulat options
  let options = {
    limit: limit || 5,
    skip: skip || 0,
  };

  // if a sortBy argument is provided from client, we'll figure that out below
  if (sortBy) {
    options = setSortBy(sortBy, options);
  }

  if (searchText) {
    let regex = new RegExp(searchText, 'i');
    let orQuery = {
      $or: [
        {email: regex},
        {firstName: regex},
        {lastName: regex},
        {assignedId: regex},
      ],
    };
    query = {
      $and: [query, orQuery],
    };
  }
  let employees = await Employees.find(query, null, options);
  let count = await Employees.countDocuments(query);

  return {
    employees,
    count,
  };
};

export default employeesQuery;
