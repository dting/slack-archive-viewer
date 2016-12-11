import React from 'react';

import { SlackSignInButton } from '../';

const Login = () => (
  <div className="login">
    <div className="brand__medium">SlackArchiveViewer</div>
    <SlackSignInButton />
  </div>
);

Login.displayName = 'Login';

export default Login;
