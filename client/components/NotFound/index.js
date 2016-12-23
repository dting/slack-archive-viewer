import { Link } from 'react-router';
import React from 'react';

export default () => (
  <div className="not-found">
    <div className="brand__medium">Slack Archive Viewer</div>
    <p>Nothing here... Go to <Link to="/" className="link__light">Home Page</Link>?</p>
  </div>
);
