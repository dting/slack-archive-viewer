import { AutoSizer } from 'react-virtualized';
import { Link } from 'react-router';
import React from 'react';
import cns from 'classnames';

import { ChannelStatusIcon } from '../../../../components';

const Channels = ({ channels, params }) => (
  <div id="col_channels" className="channels_list_holder">
    <AutoSizer disableWidth>
      {({ height }) => (
        <div id="channels_scroller" style={{ height }}>
          <div id="channels" role="navigation" className="section_holder" aria-label="Channels">
            <h2 id="channels_header">
              <span className="channel_list_header_label">
                Channels
                <span className="header_count">
                  (
                  <span id="channel_header_count">{`${channels.channels.length}`}</span>
                  )
                </span>
              </span>
            </h2>
          </div>
          <ul className="channel-list" aria-label="channels">
            {channels.channels && channels.channels.map(channel => (
              <li
                key={channel.channelId}
                className={cns('channel', { active: channel.channelName === params.channelName })}
              >
                <Link to={`/messages/${channel.channelName}/`} className="channel_name">
                  <ChannelStatusIcon channel={channel} />
                  <span className="display_flex">
                    <span className="overflow_ellipsis">
                      {channel.channelName}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </AutoSizer>
  </div>
);

Channels.propTypes = {
  channels: React.PropTypes.shape({
    channels: React.PropTypes.arrayOf(React.PropTypes.shape({
      channelId: React.PropTypes.number.isRequired,
      channelName: React.PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  params: React.PropTypes.shape({
    channelName: React.PropTypes.string,
  }),
};
Channels.displayName = 'Channels';

export default Channels;
