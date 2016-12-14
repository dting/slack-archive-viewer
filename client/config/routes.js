import { Route, IndexRoute, Redirect } from 'react-router';
import React from 'react';

import { App, Archives, Channel } from '../containers';
import { Login, NotFound } from '../components';
import Root from '../Root';

export default (store) => {
  const requireAuth = function requireAuth(nextState, replace) {
    if (!store.getState().auth.token) {
      replace({ pathname: '/' });
    }
  };

  const authRedirect = function authRedirect(nextState, replace) {
    if (store.getState().auth.token) {
      replace('/archives/');
    }
  };

  return (
    <Route path="/" component={Root}>
      <Route component={App}>
        <Route path="archives/" component={Archives} onEnter={requireAuth}>
          <Route path=":channelId/" component={Channel} />
          <Redirect from=":channelId" to=":channelId/" />
        </Route>
      </Route>
      <IndexRoute component={Login} onEnter={authRedirect} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};
