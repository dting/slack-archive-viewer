import { rsaaActionTypes } from '../rsaa-helpers';

const rsaaTypes = rsaaActionTypes(['LIST', 'GET'], 'channels');

export default {
  ...rsaaTypes,
};
