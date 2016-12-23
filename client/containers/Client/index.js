import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import ChannelList from './ChannelList';
import PlaceholderChannelList from './PlaceholderChannelList';
import { actions } from '../../modules';

class Client extends React.Component {
  static displayName = 'Client';
  static propTypes = {
    channelActions: React.PropTypes.shape({
      list: React.PropTypes.func.isRequired,
    }).isRequired,
    channelsLoaded: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
    getUser: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.getUser();
    this.props.channelActions.list();
  }

  render() {
    return (
      <div id="client-ui" className="container-fluid flexbox_client">
        <div className="client_container">
          {this.props.user.name ? <ChannelList {...this.props} /> : <PlaceholderChannelList />}
          {this.props.channelsLoaded && this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  channels: state.channels,
  channelsLoaded: !!state.channels.channels.length,
});

const mapDispatchToProps = dispatch => ({
  channelActions: bindActionCreators(actions.channels, dispatch),
  logout: bindActionCreators(actions.auth.logout, dispatch),
  getUser: bindActionCreators(actions.user.me, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
