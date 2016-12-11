import throttle from 'lodash/throttle';

export const loadState = function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};

export default function subscribe(store) {
  store.subscribe(throttle(() => {
    saveState({
      auth: store.getState().auth,
    });
  }, 1000));
}
