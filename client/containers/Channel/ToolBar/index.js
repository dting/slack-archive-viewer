import React from 'react';

import { ChannelStatusIcon } from '../../../components';

const ToolBar = ({ channel }) => (
  <div className="tool-bar">
    <div className="tool-bar__info">
      <div className="tool-bar__info__channel-name">
        <ChannelStatusIcon channel={channel} /> {channel.channelName}
      </div>
      <div className="tool-bar__info__meta">
        {channel.topic.value || 'No topic'}
      </div>
    </div>
  </div>
);

ToolBar.propTypes = {
  channel: React.PropTypes.shape({
    channelName: React.PropTypes.string.isRequired,
  }).isRequired,
};
ToolBar.displayName = 'ToolBar';

export default ToolBar;
