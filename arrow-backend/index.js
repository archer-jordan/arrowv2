import AccountsPassword from '@accounts/password';
import MongoDBInterface from '@accounts/mongo';
import AccountsServer, { ServerHooks } from '@accounts/server';
import { AccountsModule } from '@accounts/graphql-api';
import { ApolloServer } from 'apollo-server';
import { merge } from 'lodash';
import { typeDefs, CustomResolvers } from './src/graphql-api/index';
import UserProfileHelpers from 'collections/Users/helpers';
// modules
import { db } from './src/modules/mongodb.js';
import emailTransporter from './src/modules/email.js';
import './src/modules/cron';
// modules
import accountsHelpers from './src/modules/accounts';
// 
// Setup password
const password = new AccountsPassword({
  returnTokensAfterResetPassword: true,
});

// setup accounts server options
const accountsServer = new AccountsServer(
  {
    // sets up our mongoDB to work with our accounts system
    db: new MongoDBInterface(db),
    // We'll use secret for authentication
    tokenSecret: 'JrQJXK0A46X4rlXV1PAjobPypYPrPYCD',
    ambiguousErrorMessages: true,
    tokenConfigs: {
      accessToken: {
        expiresIn: '60m',
      },
      refreshToken: {
        expiresIn: '7d',
      },
    },
    // sets up how our account system will send emails
    sendMail: async ({
      from = `ARROW <${process.env.CONSTANTS_SEND_EMAIL}>`,
      subject,
      to,
      text,
      html,
    }) => {
      await emailTransporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
      });
    },
    // We can set any global template variables that we want from here
    emailTemplates: {
      from: `ARROW <${process.env.CONSTANTS_SEND_EMAIL}>`,
    },
    // This is the URL used by the accounts system to general urls  (such as reset password URL, etc)
    siteUrl: process.env.SITE_URL || null,
  },
  {
    password,
  }
);

/********************************************
 * SERVER HOOKS
 ********************************************/
accountsServer.on(ServerHooks.LoginError, accountsHelpers.loginError);
accountsServer.on(ServerHooks.ValidateLogin, accountsHelpers.validateLogin);

// init accounts module
export const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

// merge all of our Graphql type defs with the accountsjs type defs, before passing to apollo-server
const typeDefsWithAccounts = [typeDefs, accountsGraphQL.typeDefs];

// merge all our resolvers with the accountsjs resolvers, before passing to apollo-server
const resolvers = merge(accountsGraphQL.resolvers, CustomResolvers);

// Give apollo server it's options object
const server = new ApolloServer({
  resolvers,
  typeDefs: typeDefsWithAccounts,
  introspection: process.env.NODE_ENV === 'local',
  playground: process.env.NODE_ENV === 'local',
  debug: process.env.NODE_ENV === 'local',
  context: async (req) => {
    // use accounts-js to find the user via the incoming req
    let result = await accountsGraphQL.context(req);

    // if no user exists, return a empty user field
    if (!result.user) {
      return {
        user: null,
      };
    }

    // if there is a user object, find the user by ID
    let userProfile = await UserProfileHelpers.getById(result.user.id);
    /*
      return an object with 
        (a) the result from accounts-js accountsGraphQL.context, 
        (b) a roles field, and 
        (c) the user object we got back
    */
    return {
      ...result,
      user: {
        roles: userProfile && userProfile.roles ? userProfile.roles : [],
        ...result.user,
      },
    };
  },
});

// This `listen` method launches a web-server.
server.listen({ port: process.env.PORT || 8080 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
