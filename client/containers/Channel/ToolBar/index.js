import React from 'react';

import { ChannelStatusIcon } from '../../../components';

const Channel = ({ channel }) => (
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

Channel.propTypes = {
  channel: React.PropTypes.shape({
    channelName: React.PropTypes.string.isRequired,
  }).isRequired,
};
Channel.displayName = 'Channel';

export default Channel;
