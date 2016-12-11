import authTypes from '../auth/constants';
import types from './constants';

const initialState = {
  loading: null,
  name: null,
  slack: null,
  _id: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ME_SUCCESS:
      return {
        ...state,
        loading: null,
        ...action.payload,
      };
    case authTypes.LOG_OUT:
    case types.ME_FAILURE:
      return initialState;
    default:
      return state;
  }
}

export { default as actions } from './actions';
