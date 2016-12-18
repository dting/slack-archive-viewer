import authTypes from '../auth/constants';
import types from './constants';

const channelNameComparator = function channelNameComparator(a, b) {
  if (a.channelName > b.channelName) {
    return 1;
  }
  if (a.channelName < b.channelName) {
    return -1;
  }
  return 0;
};

const initialState = {
  loading: null,
  error: null,
  channels: [],
  channel: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Failed to retrieve channel list...',
      };
    case types.LIST_SUCCESS: {
      const channels = action.payload.sort(channelNameComparator);
      return {
        ...state,
        loading: false,
        channels,
      };
    }
    case types.GET_REQUEST:
      return {
        ...state,
        channel: null,
        loading: true,
      };
    case types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Failed to retrieve channel...',
      };
    case types.GET_SUCCESS: {
      const channel = action.payload;
      return {
        ...state,
        loading: false,
        channel,
      };
    }
    case authTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export { default as actions } from './actions';
