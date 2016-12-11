import FontAwesome from 'react-fontawesome';
import React from 'react';

const archived = <FontAwesome className="channel-status-icon--archived" name="archive" />;
const active = <span className="channel-status-icon--active">#</span>;

const ChannelStatusIcon = ({ channel }) => (channel.isArchived ? archived : active);

ChannelStatusIcon.displayName = 'ChannelStatusIcon';

export default ChannelStatusIcon;
