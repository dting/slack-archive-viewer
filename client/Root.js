import React from 'react';

import './root.scss';

const Root = ({ children }) => (
  <div className="page_container">
    {children}
  </div>
);

Root.propTypes = {
  children: React.PropTypes.node,
};

Root.displayName = 'Root';

export default Root;
