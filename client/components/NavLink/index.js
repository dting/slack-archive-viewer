import { connect } from 'react-redux';
import { Link } from 'react-router';
import React from 'react';

/**
 * HOC that replaces Link with a span if it is active.
 */
const NavLink = ({ className = '', activeClassName = 'active', to, path, children }) => {
  if (path === to) {
    return <span className={`${className} ${activeClassName}`}>{children}</span>;
  }
  return (
    <Link to={to} className={className} disabled={path === to}>
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  className: React.PropTypes.string,
  activeClassName: React.PropTypes.string,
  to: React.PropTypes.string,
  path: React.PropTypes.string,
  children: React.PropTypes.node,
};

NavLink.displayName = 'NavLink';

export default connect(
  (state, ownProps) => ({
    ...ownProps,
    path: state.routing.locationBeforeTransitions.pathname,
  }),
)(NavLink);
