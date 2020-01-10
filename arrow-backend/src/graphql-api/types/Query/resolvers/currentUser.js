import UserProfileHelpers from 'collections/Users/helpers';

export default async (root, args, context) => {
  if (!context.user || !context.user.id) return null;
  let userProfile = await UserProfileHelpers.getById(context.user.id);

  return {
    ...context.user,
    roles: (userProfile && userProfile.roles) || [],
    firstName: userProfile && userProfile.firstName,
    lastName: userProfile && userProfile.lastName
  };
};
