import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import { browserHistory, Router } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import { middleware, reducers, routes } from './config';
import localStorage, { loadState } from './config/localStorage';
import { actions } from './modules/auth';

const store = createStore(reducers, loadState(), middleware);
const history = syncHistoryWithStore(browserHistory, store);

// Subscribe saveState function to changes in the store
localStorage(store);

const token = cookie.load('token');
if (token) {
  store.dispatch(actions.setToken(token));
  cookie.remove(token);
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {routes(store)}
    </Router>
  </Provider>
), document.getElementById('app'));
