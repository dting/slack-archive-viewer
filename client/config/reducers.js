import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import {
  auth,
  channels,
  searchInput,
  searchResults,
  user,
} from '../modules';

export default combineReducers({
  auth,
  channels,
  searchInput,
  searchResults,
  user,
  routing,
});
