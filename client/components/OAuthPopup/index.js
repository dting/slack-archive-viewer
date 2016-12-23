import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import React from 'react';

import { getAllParams, normalizeTokenKeys } from './parse-url';
import { actions } from '../../modules';
import openPopup from './popup';

class OAuthPopup extends React.PureComponent {
  static propTypes = {
    replace: React.PropTypes.func.isRequired,
    setToken: React.PropTypes.func.isRequired,
    provider: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.oAuthSignIn = this.oAuthSignIn.bind(this);
    this.cleanup = this.cleanup.bind(this);
    this.popupHandler = this.popupHandler.bind(this);
    window.onbeforeunload = this.cleanup;
  }

  componentWillUnmount() {
    this.cleanup();
  }

  cleanup() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (this.popup) {
      this.popup.close();
      this.popup = null;
    }
  }

  popupHandler() {
    if (!this.interval || !this.popup || this.popup.closed) {
      this.cleanup();
      return;
    }

    let creds;
    try {
      creds = getAllParams(this.popup.location);
    } catch (err) {} // eslint-disable-line no-empty

    if (creds && normalizeTokenKeys(creds).code) {
      const token = ((this.popup.document || {}).body || {}).innerHTML;
      if (token) {
        this.cleanup();
        this.props.setToken(token)
          .then(() => this.props.replace('/messages/'))
          .catch(() => this.props.replace('/'));
      }
    }
  }

  authenticate() {
    const { provider, url } = this.props;
    this.popup = openPopup(provider, url);
    this.interval = setInterval(this.popupHandler, 100);
  }

  oAuthSignIn() {
    if (this.popup) {
      this.popup.focus();
    } else {
      this.authenticate();
    }
  }

  render() {
    return (
      <button className="oauth-popup__button" onClick={this.oAuthSignIn}>
        {this.props.children}
      </button>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setToken: bindActionCreators(actions.auth.setToken, dispatch),
  replace: bindActionCreators(replace, dispatch),
});

export default connect(null, mapDispatchToProps)(OAuthPopup);
