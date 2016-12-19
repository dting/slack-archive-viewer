import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import ChannelList from './ChannelList';
import { actions } from '../../modules';

class Client extends React.Component {
  static displayName = 'Client';
  static propTypes = {
    channelActions: React.PropTypes.shape({
      list: React.PropTypes.func.isRequired,
    }).isRequired,
    channelsLoaded: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.props.channelActions.list();
  }

  render() {
    return (
      <div className="client_container">
        <ChannelList {...this.props} />
        {this.props.channelsLoaded && this.props.children}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
