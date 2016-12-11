import { CALL_API } from 'redux-api-middleware';

import types from './constants';

export default {
  get(token, channelId) {
    return {
      [CALL_API]: {
        endpoint: `/api/channels/${channelId}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        method: 'GET',
        types: [
          types.GET_REQUEST,
          types.GET_SUCCESS,
          types.GET_FAILURE,
        ],
      },
    };
  },
  list(token) {
    return {
      [CALL_API]: {
        endpoint: '/api/channels/',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        method: 'GET',
        types: [types.LIST_REQUEST, types.LIST_SUCCESS, types.LIST_FAILURE],
      },
    };
  },
};
