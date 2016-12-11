import React from 'react';

import { ChannelStatusIcon, NavLink } from '../../../../components';

const ChannelList = ({ channelList }) => (
  <div className="channel-list">
    <div className="channel-list__heading">
      <span className="channel-list__heading--bold">CHANNELS</span>&nbsp;
      <span className="channel-list__heading--light">({`${channelList.channels.length}`})</span>
    </div>
    {channelList.channels && channelList.channels.map(channel => (
      <NavLink
        className="channel-list__item"
        key={channel.channelId}
        to={`/archives/${channel.channelId}/`}
      >
        <ChannelStatusIcon channel={channel} />
        <span className="channel-list__item__name">
          {channel.channelName}
        </span>
      </NavLink>
    ))}
  </div>
);

ChannelList.propTypes = {
  channelList: React.PropTypes.shape({
    channels: React.PropTypes.arrayOf(React.PropTypes.shape({
      channelId: React.PropTypes.number.isRequired,
      channelName: React.PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};
ChannelList.displayName = 'ChannelList';

export default ChannelList;
