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
