import React from 'react';

import Channels from './Channels';
import TeamMenu from './TeamMenu';

const ChannelList = props => (
  <div className="client_channels_list_container">
    <div id="col_channels_bg" />
    <TeamMenu {...props} />
    <Channels {...props} />
  </div>
);

ChannelList.displayName = 'ChannelList';

export default ChannelList;
