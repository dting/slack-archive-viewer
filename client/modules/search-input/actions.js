import types from './constants';

const update = function update(value) {
  return {
    type: types.UPDATE,
    payload: { value },
  };
};

export default {
  update,
};
