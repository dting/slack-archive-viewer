import { replace } from 'react-router-redux';

import { withToken } from '../rsaa-helpers';
import rsaas from './rsaa';
import authActions from '../auth/actions';

/**
 * Retrieves user info or redirects to /login on error
 */
const me = function me() {
  return (dispatch, getState) => withToken(rsaas.me)(dispatch, getState)
    .then((action) => {
      if (action.error) {
        dispatch(authActions.logout());
        dispatch(replace('/'));
      }
    })
    .catch(console.error);
};

export default {
  me,
};
