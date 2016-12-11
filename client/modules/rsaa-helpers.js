const SUFFIXES = ['REQUEST', 'SUCCESS', 'FAILURE'];

/**
 * Creates a map of RSAA types as key value pairs in the format of:
 *   key: `<prefix>_<suffix>`
 *   value: `<domain>/<key>`
 *
 * @param prefixes {string[]} - prefixes of RSAA actions
 * @param domain {string} - domain for RSAA action values
 * @return {Object} types
 * @return {string} types.key - rsaa action type constant name
 * @return {string} types.value - rsaa action type constant value
 */
export const rsaaActionTypes = function rsaaActionTypes(prefixes, domain) {
  const types = {};
  prefixes.forEach(prefix => Object.assign(
    types,
    ...SUFFIXES.map(suffix => `${prefix}_${suffix}`)
      .map(type => ({ [type]: `${domain}/${type}` }))));
  return types;
};

/**
 * Wrapper that returns a function that dispatches RSAA actions after getting
 * jwt token from the state.
 */
export const withToken = function withToken(rsaa, ...args) {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    return dispatch(rsaa(token, ...args));
  };
};
