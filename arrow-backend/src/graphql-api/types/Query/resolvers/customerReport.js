import CustomerReports from 'collections/CustomerReports/model';

const checkIfUserHasPersmission = ({user, customerId}) => {
  // must be an superAdmin or coAdmin
  if (!user || !user._id)
    throw new Error('You must be logged in to view customer reports');

  if (!user || !user.roles || user.roles.length === 0) {
    throw new Error('You must be a superAdmin or coAdmin to query users');
  }
  // must be an superAdmin or coAdmin
  if (!user.roles.includes('coAdmin') && !user.roles.includes('superAdmin')) {
    throw new Error('You must be a superAdmin or coAdmin to query users');
  }

  // if this is a company admin, they can only query their own company's data
  if (user.roles.includes('coAdmin') && customerId !== user.customerId) {
    throw new Error('Company admins can only view data from their own company');
  }

  // Check permission
  if (
    user.roles.includes('coAdmin') &&
    !user.permissions.includes('viewCompanyData')
  ) {
    throw new Error('You do not have permissions to query company data');
  }
};

const customerReport = async (root, {month, year, customerId}, context) => {
  try {
    // make sure onlly super admins and company admins can view this
    checkIfUserHasPersmission({user: context.user, customerId});
    let report = await CustomerReports.findOne({month, year, customerId});
    return report;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default customerReport;
