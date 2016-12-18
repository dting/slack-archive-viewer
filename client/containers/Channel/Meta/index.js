import React from 'react';
import moment from 'moment';

const Meta = ({ channelName, created, Creator, purpose, style }) => (
  <div id="end_div" style={style}>
    <div id="end_display_div">
      <div id="end_display_meta">
        <div id="channel_meta">
          <h1 className="small_bottom_margin channel_meta_name">
            <span className="normal">#</span>
            {channelName}
          </h1>
          <p className="small_bottom_margin">
            <span className="color_d58247">{Creator.userName}</span> created this channel
            on {moment(created).format('MMMM Do, YYYY')}.
            {purpose.value &&
              <span className="channel_meta_purpose_container">
                <span className="color_4BBE2E"> Purpose: </span>
                <span className="italic no_jumbomoji">{purpose.value}</span>
              </span>
            }
          </p>
        </div>
      </div>
    </div>
  </div>
);

Meta.propTypes = {
  channelName: React.PropTypes.string.isRequired,
  created: React.PropTypes.string.isRequired,
  Creator: React.PropTypes.shape({
    userName: React.PropTypes.string,
  }).isRequired,
  purpose: React.PropTypes.shape({
    value: React.PropTypes.string,
  }),
  style: React.PropTypes.shape({}),
};
Meta.displayName = 'Meta';

export default Meta;
