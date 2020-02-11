import message from 'components/common/message';
import client from 'ApolloClient/index.js';
import authenticate from 'ApolloClient/Mutations/authenticate';
import logout from 'ApolloClient/Mutations/logout';
import sendResetPasswordEmail from 'ApolloClient/Mutations/sendResetPasswordEmail';
import changePassword from 'ApolloClient/Mutations/changePassword';
import constants from 'lib/constants';

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
        constants.authTokenName,
        data.authenticate.tokens.accessToken
      );
      window.localStorage.setItem(
        constants.refreshTokenName,
        data.authenticate.tokens.refreshToken
      );

      resolve(true);
    } catch (err) {
      reject(err);
    }
  });

AuthHelpers.changePassword = ({oldPassword, newPassword}) =>
  new Promise(async (resolve, reject) => {
    let user;
    try {
      await client.mutate({
        mutation: changePassword,
        variables: {
          oldPassword,
          newPassword,
        },
      });
      resolve(user);
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

      window.localStorage.removeItem(constants.authTokenName);
      window.localStorage.removeItem(constants.refreshTokenName);
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
