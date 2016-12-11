import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import {
  auth,
  channels,
  user,
} from '../modules';

export default combineReducers({
  auth,
  channels,
  user,
  routing,
});
