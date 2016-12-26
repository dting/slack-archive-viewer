import types from './constants';

const initialState = {
  value: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export { default as actions } from './actions';
