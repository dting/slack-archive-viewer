import FontAwesome from 'react-fontawesome';
import React from 'react';

const ChannelStatusIcon = ({ channel, style }) => {
  if (channel.isArchived) {
    return <FontAwesome className="channel-status-icon--archived" name="archive" style={style} />;
  } else {
    return <span className="channel-status-icon--active" style={style}>#</span>;
  }
};

ChannelStatusIcon.displayName = 'ChannelStatusIcon';

export default ChannelStatusIcon;
