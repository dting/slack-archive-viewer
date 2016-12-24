import React from 'react';
import FontAwesome from 'react-fontawesome';

import { ChannelStatusIcon } from '../../components';

const Header = ({ channel }) => (
  <div id="client-header">
    <div className="channel_header">
      <div className="messages_header">
        <div className="channel_title">
          <h2 id="channel_name_container" className="channel_name_container">
            <span id="channel_name" className="channel_name">
              <span id="channel_title">
                <ChannelStatusIcon
                  channel={channel}
                  style={{ fontWeight: 'inherit', margin: 0 }}
                />
                {channel.channelName}
              </span>
            </span>
          </h2>
        </div>
      </div>
    </div>
    <div id="channel_header_info">
      <span id="channel_members_toggle_count">
        <FontAwesome className="icon_user" name="user-o" />
        {(channel.Users || {}).length || 0}
      </span>
      <span className="topic_divider">|</span>
      <span id="channel_topic_text" className="italic">
        Topic: {channel.topic.value || 'No Topic'}
      </span>
    </div>
  </div>
);

Header.propTypes = {
  channel: React.PropTypes.shape({
    channelName: React.PropTypes.string.isRequired,
  }).isRequired,
};
Header.displayName = 'Header';

export default Header;
