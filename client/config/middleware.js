import { apiMiddleware } from 'redux-api-middleware';
import { applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

const devTools = function devTools() {
  if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    return window.devToolsExtension();
  }
  return f => f;
};

const middleware = [
  apiMiddleware,
  thunk,
  routerMiddleware(browserHistory),
];

export default compose(applyMiddleware(...middleware), devTools());
