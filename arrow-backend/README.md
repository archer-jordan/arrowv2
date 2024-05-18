## Getting Started

- clone repo
- run `yarn install`
- make sure you have `nodemon` globally, or locally
- make sure you have a `.env` file in the root of the project (see `example.env`)
- run `yarn local`
- visit `localhost:4000` and you should see the graphql api playground
- set your apollo-client URL to `localhost:4000/graphql`

```
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});
```

# Users/Authentication

- We use accountsjs package to do authentication
- This package will create a users table
- It is similar to meteor accounts system if you've used that
- accountsjs will also "take over" (so to speak) the User type for graphql, as a result, we create a UserProfile type that we can custumize easier. The main thing to keep in mind is UserProfile = User. When you return a UserProfile, you're just returning a User record from the users table in mongoDB

# LICENSES

last updated Sept 26, 2020

- @accounts/graphql-api [MIT License](https://github.com/accounts-js/graphql/blob/master/LICENSE)
- @accounts/mongo [MIT License](https://github.com/accounts-js/graphql/blob/master/LICENSE)
- @accounts/password [MIT License](https://github.com/accounts-js/graphql/blob/master/LICENSE)
- @accounts/server [MIT License](https://github.com/accounts-js/graphql/blob/master/LICENSE)
- @graphql-modules/core [MIT License](https://github.com/Urigo/graphql-modules/blob/master/LICENSE.md)
- apollo-server [MIT License](https://github.com/apollographql/apollo-server/blob/main/LICENSE)
- aws-sdk [Apache License 2.0](https://github.com/aws/aws-sdk-js/blob/master/LICENSE.txt)
- babel-cli [MIT License](https://www.npmjs.com/package/babel-cli)
- babel-plugin-transform-object-rest-spread [MIT License](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread)
- babel-preset-env [MIT License](https://github.com/babel/babel-preset-env/blob/1.x/LICENSE)
- dataloader [MIT License](https://github.com/graphql/dataloader/blob/master/LICENSE)
- dotenv [BSD 2-Clause "Simplified" License](https://github.com/motdotla/dotenv/blob/master/LICENSE)
- graphql [MIT License](https://github.com/graphql/graphql-js/blob/master/LICENSE)
- graphql-toolkit [MIT License](https://github.com/graphql/graphql-js/blob/master/LICENSE)
- lodash.merge [MIT License](https://www.npmjs.com/package/lodash.merge)
- moment [MIT License](https://www.npmjs.com/package/moment)
- mongoose [MIT License](https://github.com/Automattic/mongoose/blob/master/LICENSE.md)
- node-cron [ISC](https://github.com/node-cron/node-cron/blob/master/LICENSE.md)
- nodemailer [MIT License](https://github.com/nodemailer/nodemailer/blob/master/LICENSE)
