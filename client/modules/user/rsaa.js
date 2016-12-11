import { CALL_API } from 'redux-api-middleware';

import types from './constants';

export default {
  me(token) {
    return {
      [CALL_API]: {
        endpoint: '/api/users/me',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        method: 'GET',
        types: [types.ME_REQUEST, types.ME_SUCCESS, types.ME_FAILURE],
      },
    };
  },
};
