import { Route, IndexRoute, Redirect } from 'react-router';
import React from 'react';

import { App, Client, Channel } from '../containers';
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
      replace('/messages/');
    }
  };

  return (
    <Route path="/" component={Root}>
      <Route component={App}>
        <Route path="messages/" component={Client} onEnter={requireAuth}>
          <Route path=":channelName/" component={Channel} />
          <Redirect from=":channelName" to=":channelName/" />
        </Route>
      </Route>
      <IndexRoute component={Login} onEnter={authRedirect} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};
