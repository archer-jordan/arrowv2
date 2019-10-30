import message from 'components/common/message';
import client from 'ApolloClient/index.js';
import createUserProfile from 'ApolloClient/Mutations/createUserProfile';
import authenticate from 'ApolloClient/Mutations/authenticate';
import logout from 'ApolloClient/Mutations/logout';
import currentUser from 'ApolloClient/Queries/currentUser';
import sendResetPasswordEmail from 'ApolloClient/Mutations/sendResetPasswordEmail';
import signup from 'ApolloClient/Mutations/signup';

const AuthHelpers = {};

AuthHelpers.sendPasswordResetEmail = ({email}) =>
  new Promise(async (resolve, reject) => {
    try {
      // sign in with email
      let response = await client.mutate({
        mutation: sendResetPasswordEmail,
        variables: {email},
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });

AuthHelpers.handleLogin = ({email, password}) =>
  new Promise(async (resolve, reject) => {
    try {
      // sign in with email
      let {data} = await client.mutate({
        mutation: authenticate,
        variables: {
          params: {
            password,
            user: {
              email: email,
            },
          },
        },
      });

      window.localStorage.setItem(
        'growlab_access_token',
        data.authenticate.tokens.accessToken
      );
      window.localStorage.setItem(
        'growlab_refresh_token',
        data.authenticate.tokens.refreshToken
      );

      // let res = await client.query({
      //   query: currentUser
      // });

      resolve(true);
    } catch (err) {
      reject(err);
    }
  });

AuthHelpers.handleSignup = async ({email, password, profile = {}, role}) =>
  new Promise(async (resolve, reject) => {
    let userId;
    try {
      await client.mutate({
        mutation: signup,
        variables: {
          user: {
            email,
            password,
          },
        },
      });

      // sign in with email
      let {data} = await client.mutate({
        mutation: authenticate,
        variables: {
          params: {
            password,
            user: {
              email: email,
            },
          },
        },
      });

      window.localStorage.setItem(
        'growlab_access_token',
        data.authenticate.tokens.accessToken
      );
      window.localStorage.setItem(
        'growlab_refresh_token',
        data.authenticate.tokens.refreshToken
      );

      setTimeout(async () => {
        let res = await client.query({
          query: currentUser,
        });

        await client.mutate({
          mutation: createUserProfile,
          variables: {
            userId: res.data.currentUser.id,
            role,
          },
        });
      }, 1000);

      resolve(userId);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

AuthHelpers.signOut = id =>
  new Promise(async (resolve, reject) => {
    let user;
    try {
      await client.mutate({
        mutation: logout,
      });

      window.localStorage.removeItem('growlab_access_token');
      window.localStorage.removeItem('growlab_refresh_token');
      // reset the store
      await client.resetStore();
      // let user know
      message.info("You've successfully logged out...");
      window.location.reload();
    } catch (err) {
      console.log(err);
      reject(err);
    }
    console.log('user');
    // resolve the promise
    resolve(user);
  });

export default AuthHelpers;
