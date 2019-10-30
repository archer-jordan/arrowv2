import message from 'antd/lib/message';

const ErrorHelpers = {};

ErrorHelpers.cleanErrorString = string => {
  return string
    .replace(']', '')
    .replace('[', '')
    .replace(':', '')
    .replace('error', '')
    .replace('GraphQL', '')
    .replace(/[0-9]/g, '');
};

ErrorHelpers.getErrorString = e => {
  let errorStrings = e.graphQLErrors.map(x =>
    ErrorHelpers.cleanErrorString(x.message)
  );
  if (errorStrings && errorStrings.length > 0) {
    return errorStrings[0];
  } else {
    return null;
  }
};
// handelGraphqlError
// takes in a graphql error, maps over it to get the strings,
// and then does an antd message for each error string it fings
ErrorHelpers.handelGraphqlError = e => {
  let errorStrings = e.graphQLErrors.map(x =>
    ErrorHelpers.cleanErrorString(x.message)
  );

  if (errorStrings && errorStrings.length > 0) {
    errorStrings.forEach(error => {
      message.error(error);
    });
  } else {
    message.error('Something went wrong!');
  }
};

ErrorHelpers.logError = ({ error, extra = {} }) => {
  console.log({ error, extra });
  // https://blog.sentry.io/2019/01/17/debug-tough-front-end-errors-sentry-clues
  window.Sentry.withScope(scope => {
    scope.setFingerprint([window.location.pathname]);
    window.Sentry.captureException(error, { extra });
  });
};

ErrorHelpers.handleError = err => {
  // check if the error has a simple err.message we can just display, if it does, fire an antd message
  if (err && err.message) {
    return message.error(ErrorHelpers.cleanErrorString(err.message));
  }

  // check if the error is from grapqhl, if it is, handle it.
  if (err && err.graphQLErrors) {
    return ErrorHelpers.handelGraphqlError(err);
  }

  return message.error('hmm... somethign went wrong.');
};

export default ErrorHelpers;
