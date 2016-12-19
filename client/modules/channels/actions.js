import { withToken } from '../rsaa-helpers';
import rsaas from './rsaa';

/**
 * Retrieves channels list
 */
const list = function list() {
  return (dispatch, getState) => withToken(rsaas.list)(dispatch, getState);
};


/**
 * Retrieves channel by channelId
 */
const get = function get(channelId) {
  return (dispatch, getState) => withToken(rsaas.get, channelId)(dispatch, getState);
};

export default {
  get,
  list,
};
