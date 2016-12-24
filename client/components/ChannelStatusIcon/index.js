import FontAwesome from 'react-fontawesome';
import React from 'react';

const ChannelStatusIcon = ({ channel, style }) => (channel.isArchived ? (
  <FontAwesome className="channel-status-icon--archived" name="archive" style={style} />
) : (
  <span className="channel-status-icon--active" style={style}>#</span>
));

ChannelStatusIcon.displayName = 'ChannelStatusIcon';
ChannelStatusIcon.propTypes = {
  channel: React.PropTypes.shape({
    isArchived: React.PropTypes.bool.isRequired,
  }).isRequired,
  style: React.PropTypes.shape({}).isRequired,
};

export default ChannelStatusIcon;
