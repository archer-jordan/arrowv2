import Attachments from 'collections/Attachments/model';

const getCustomerAttachments = async (root, args, context) => {
  try {
    if (!context.user) {
      throw new Error('You must be logged in to query getAttachment');
    }

    if (!context.user.id) {
      throw new Error('You must be logged in to query getAttachment');
    }

    if (!context.user.roles) {
      throw new Error('You must have a role to query getAttachment');
    }

    if (context.user.roles.length === 0) {
      throw new Error('You must have a role to query getAttachment');
    }

    let query = {
      type: args.type,
      customerId: context.user.customerId, // If user is a coEmployee of coAdmin, set customerId to the one on their profile
    };

    // make sure if the user is trying to view an CustomerPlan, that they are a super admin or coadmin
    if (
      query.type === 'CompanyAdminDoc' &&
      !context.user.roles.includes('superAdmin') &&
      !context.user.roles.includes('coAdmin')
    ) {
      return [];
    }

    // if at this point in the function we don't have a customerId in the query, just return null to be safe.
    if (!query.customerId) return null;

    let options = {
      sort: {
        createdAt: -1,
      },
    };
    let attachments = await Attachments.find(query, null, options);
    return attachments;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default getCustomerAttachments;
