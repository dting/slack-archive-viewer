import { rsaaActionTypes } from '../rsaa-helpers';

const rsaaTypes = rsaaActionTypes(['SEARCH'], 'search-results');

export default {
  LOCAL_SEARCH_RESULTS: 'search-results/LOCAL_SEARCH_RESULTS',
  ...rsaaTypes,
};
