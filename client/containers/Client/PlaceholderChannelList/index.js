import React from 'react';

const PlaceholderChannelList = () => (
  <div className="client_channels_list_container placeholder">
    <div id="col_channels_bg" />
    <div className="placeholder_shimmer_clipper">
      <div className="placeholder_shimmer_bg" />
    </div>
    <div className="team_menu placeholder">
      <div className="placeholder_team_name" />
      <div className="placeholder_user_name" />
    </div>

    <div id="col_channels" className="channels_list_holder placeholder">
      <div className="placeholder_channel_long" />
      <div className="placeholder_channel_short" />
      <div className="placeholder_channel_long" />
      <div className="spacer" />
      <div className="placeholder_channel_short" />
      <div className="placeholder_channel_long" />
      <div className="placeholder_channel_short" />
    </div>
  </div>
);

PlaceholderChannelList.displayName = 'PlaceholderChannelList';

export default PlaceholderChannelList;
