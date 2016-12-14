/**
 * Adapted from Redux-Auth:
 * https://github.com/lynndylanhurley/redux-auth/blob/master/src/utils/parse-url.js
 *
 * WTFPL © Lynn Dylan Hurley
 */

import querystring from 'querystring';

export const normalizeTokenKeys = function normalizeTokenKeys(params) {
  // normalize keys
  if (params.token) {
    params['access-token'] = params.token;
    delete params.token;
  }
  if (params.auth_token) {
    params['access-token'] = params.auth_token;
    delete params.auth_token;
  }
  if (params.client_id) {
    params.client = params.client_id;
    delete params.client_id;
  }
  if (params.config) {
    params.endpointKey = params.config;
    delete params.config;
  }

  return params;
};

const getAnchorSearch = function getAnchorSearch(location) {
  const rawAnchor = location.anchor || '';
  const arr = rawAnchor.split('?');
  return (arr.length > 1) ? arr[1] : null;
};

const getSearchQs = function getSearchQs(location) {
  const rawQs = location.search || '';
  const qs = rawQs.replace('?', '');
  const qsObj = (qs) ? querystring.parse(qs) : {};
  return qsObj;
};

const getAnchorQs = function getAnchorQs(location) {
  const anchorQs = getAnchorSearch(location);
  const anchorQsObj = (anchorQs) ? querystring.parse(anchorQs) : {};
  return anchorQsObj;
};

export const getAllParams = function getAllParams(location) {
  return { ...getAnchorQs(location), ...getSearchQs(location) };
};
