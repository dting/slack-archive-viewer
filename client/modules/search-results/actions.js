import types from './constants';
import { withToken } from '../rsaa-helpers';
import rsaas from './rsaa';

const channelSearch = function channelSearch(searchTerms) {
  return (dispatch, getState) => {
    const { channels: { channel } } = getState();

    const messages = [];
    channel.Days.forEach((day) => {
      day.Messages.forEach((message) => {
        if (message.text.indexOf(searchTerms) > -1) {
          messages.push(message);
        }
      });
    });

    dispatch({
      type: types.LOCAL_SEARCH_RESULTS,
      payload: {
        messages,
        files: [],
        searchTerms,
      },
    });
  };
};

const serverSearch = function serverSearch() {
  return (dispatch, getState) => withToken(rsaas.search)(dispatch, getState);
};

export default {
  channel: channelSearch,
  server: serverSearch,
};
