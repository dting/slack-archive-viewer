import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import ToolBar from './ToolBar';
import Messages from './Messages';
import { actions } from '../../modules';

class Channel extends React.Component {
  static propTypes = {
    channelActions: React.PropTypes.shape({
      get: React.PropTypes.func.isRequired,
    }).isRequired,
    params: React.PropTypes.shape({
      channelId: React.PropTypes.string.isRequired,
    }).isRequired,
    channel: React.PropTypes.shape({
      Messages: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    }),
  };

  constructor(props) {
    super(props);
    const { channelActions, params } = props;
    channelActions.get(params.channelId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.channelId !== this.props.params.channelId) {
      const { channelActions, params } = this.props;
      channelActions.get(params.channelId);
    }
  }

  render() {
    return (
      <div className="channel">
        {this.props.channel && <ToolBar {...this.props} />}
        {this.props.channel && (
          <div className="channel__contents">
            <Messages messages={this.props.channel.Messages} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channel: state.channels.channel,
});

const mapDispatchToProps = dispatch => ({
  channelActions: bindActionCreators(actions.channels, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
