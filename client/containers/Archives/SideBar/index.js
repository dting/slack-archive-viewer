import React from 'react';

import ChannelList from './ChannelList';
import UserMenu from './UserMenu';

const SideBar = props => (
  <div className="side-bar">
    <UserMenu {...props} />
    <ChannelList {...props} />
  </div>
);

SideBar.displayName = 'SideBar';

export default SideBar;
