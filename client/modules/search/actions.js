import types from './constants';
import { withToken } from '../rsaa-helpers';
import rsaas from './rsaa';

const channel = function channel() {
  return (dispatch, getState) => {
    const { channels } = getState();
    if (!channels.channel) {
      dispatch({
        type: types.LOCAL_SEARCH_RESULTS,
        payload: { results: [], files: [] },
      });
    }
  };
};

const server = function server() {
  return (dispatch, getState) => withToken(rsaas.search)(dispatch, getState);
};

export default {
  channel,
  server,
};
