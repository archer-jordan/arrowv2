export default {
  appName: 'Archer Jordan',
  authTokenName: process.env.AUTH_TOKEN_NAME || 'arrow_access_token',
  refreshTokenName: process.env.REFRESH_TOKEN_NAME || 'arrow_refresh_token',
  plans: [
    {
      id: 'arrowCare',
      title: 'Arrow Care (default plan)',
    },
    {
      id: 'arrowCarePlus',
      title: 'Arrow Care Plus',
    },
  ],
};
