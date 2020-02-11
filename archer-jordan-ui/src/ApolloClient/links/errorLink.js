import {onError} from 'apollo-link-error';
import constants from 'lib/constants';

const errorLink = onError(
  ({graphQLErrors, networkError, response, operation, forward}) => {
    if (
      networkError &&
      networkError.statusCode &&
      (networkError.statusCode === 401 || networkError.statusCode === 500)
    ) {
      // remove cached token on 401 from the server
      window.localStorage.removeItem(constants.authTokenName);
    }
  }
);

export default errorLink;
