import { rsaaActionTypes } from '../rsaa-helpers';

const rsaaTypes = rsaaActionTypes(['SEARCH'], 'search');

export default {
  LOCAL_SEARCH_RESULTS: 'search/LOCAL_SEARCH_RESULTS',
  ...rsaaTypes,
};
