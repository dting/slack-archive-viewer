import { CALL_API } from 'redux-api-middleware';

import types from './constants';

export default {
  server(token) {
    return {
      [CALL_API]: {
        endpoint: '/api/messages/search',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        method: 'GET',
        types: [types.SEARCH_REQUEST, types.SEARCH_SUCCESS, types.SEARCH_FAILURE],
      },
    };
  },
};
