import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import {
  auth,
  channels,
  search,
  user,
} from '../modules';

export default combineReducers({
  auth,
  channels,
  search,
  user,
  routing,
});
