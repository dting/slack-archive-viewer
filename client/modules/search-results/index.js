import types from './constants';

const initialState = {
  loading: null,
  messages: [],
  files: [],
  searchTerms: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOCAL_SEARCH_RESULTS:
      return {
        ...state,
        ...action.payload,
      };
    case types.SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        loading: null,
        ...action.payload,
      };
    case types.SEARCH_FAILURE:
      return initialState;
    default:
      return state;
  }
}

export { default as actions } from './actions';
