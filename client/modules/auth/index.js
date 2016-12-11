import types from './constants';

const initialState = {
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGOUT:
      return {
        ...initialState,
      };
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}

export { default as actions } from './actions';
