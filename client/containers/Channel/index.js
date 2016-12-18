import { AutoSizer, CellMeasurer, List } from 'react-virtualized';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import ToolBar from './ToolBar';
import Meta from './Meta';
import Day from './Day';
import { actions } from '../../modules';

class Channel extends React.Component {
  static propTypes = {
    channelActions: React.PropTypes.shape({
      get: React.PropTypes.func.isRequired,
    }).isRequired,
    params: React.PropTypes.shape({
      channelId: React.PropTypes.string.isRequired,
    }).isRequired,
    channel: React.PropTypes.shape({
      channelName: React.PropTypes.string.isRequired,
      Days: React.PropTypes.arrayOf(React.PropTypes.shape({
        _id: React.PropTypes.number.isRequired,
        Messages: React.PropTypes.arrayOf(React.PropTypes.shape({})),
      })),
    }),
  };

  constructor(props) {
    super(props);
    this.dayRenderer = this.dayRenderer.bind(this);

    const { channelActions, params } = props;
    channelActions.get(params.channelId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.channelId !== this.props.params.channelId) {
      const { channelActions, params } = this.props;
      channelActions.get(params.channelId)
        .then(() => this.list.recomputeRowHeights());
    }
  }

  dayRenderer({ index, style }) {
    if (index === 0) {
      return <Meta key={this.props.channel.channelName} {...this.props.channel} style={style} />;
    }
    const day = this.props.channel.Days[index - 1];
    return <Day key={day.channelDayId} day={day} style={style} />;
  }

  render() {
    return (
      <div className="client_main_container">
        {this.props.channel && <ToolBar {...this.props} />}
        {this.props.channel && this.props.channel.Days.length && (
          <div id="client_body">
            <div id="col_messages">
              <div className="row-fluid">
                <div id="messages_container" role="main">
                  <AutoSizer>
                    {({ height, width }) => (
                      <div id="msgs_scroller_div" style={{ height, width }}>
                        <CellMeasurer
                          cellRenderer={this.dayRenderer}
                          columnCount={1}
                          width={width}
                          rowCount={this.props.channel.Days.length}
                        >
                          {({ getRowHeight }) => (
                            <List
                              ref={(list) => { this.list = list; }}
                              id="msgs_div"
                              className="msgs_holder"
                              rowHeight={getRowHeight}
                              rowRenderer={this.dayRenderer}
                              rowCount={this.props.channel.Days.length + 1}
                              width={width}
                              height={height}
                              overscanRowCount={5}
                              channel={this.props.channel}
                            />
                          )}
                        </CellMeasurer>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channel: state.channels.channel,
});

const mapDispatchToProps = dispatch => ({
  channelActions: bindActionCreators(actions.channels, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
