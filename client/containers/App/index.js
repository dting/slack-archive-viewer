import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import React from 'react';

import { LoadingDots } from '../../components';
import { actions } from '../../modules';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    replace: React.PropTypes.func.isRequired,
    token: React.PropTypes.string.isRequired,
    user: React.PropTypes.shape({
      loading: React.PropTypes.bool,
    }).isRequired,
    userActions: React.PropTypes.shape({
      me: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    if (this.props.token) {
      this.props.userActions.me();
    } else {
      this.props.replace('/');
    }
  }

  render() {
    const { children, user } = this.props;
    return (
      <div className="app">
        {user.loading && (
          <div className="app_loading">
            <div className="brand-medium">Slack Archive Viewer</div>
            <p className="app_loading__message">Loading</p>
            <LoadingDots />
          </div>
        )}
        {!user.loading && user.name && children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(actions.user, dispatch),
  replace: bindActionCreators(replace, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
