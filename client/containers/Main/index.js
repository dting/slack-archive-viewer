import { AutoSizer, CellMeasurer, List } from 'react-virtualized';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import Header from '../Header';
import Meta from './Meta';
import Day from './Day';
import { Search } from '../../containers';
import { actions } from '../../modules';

class Main extends React.Component {
  static displayName = 'Main';
  static propTypes = {
    channel: React.PropTypes.shape({
      channelName: React.PropTypes.string.isRequired,
      Days: React.PropTypes.arrayOf(React.PropTypes.shape({
        _id: React.PropTypes.number.isRequired,
        Messages: React.PropTypes.arrayOf(React.PropTypes.shape({})),
      })),
    }),
    channelActions: React.PropTypes.shape({
      get: React.PropTypes.func.isRequired,
    }).isRequired,
    nameToIdMap: React.PropTypes.shape({}).isRequired,
    params: React.PropTypes.shape({
      channelName: React.PropTypes.string.isRequired,
      searchTerms: React.PropTypes.string,
    }).isRequired,
    searchResults: React.PropTypes.shape({
      searchTerms: React.PropTypes.string,
    }).isRequired,
    searchResultsActions: React.PropTypes.shape({
      channel: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.dayRenderer = this.dayRenderer.bind(this);

    const { channelActions, nameToIdMap, params } = props;
    channelActions.get(nameToIdMap.get(params.channelName));
  }

  componentWillReceiveProps(newProps) {
    const { searchResults, searchResultsActions } = this.props;
    const { channel, params: { searchTerms } } = newProps;
    if (channel &&
      (searchResults.searchTerms !== searchTerms || searchResults.searchTerms !== searchTerms)) {
      searchResultsActions.channel(searchTerms);
    }
  }

  componentDidUpdate(prevProps) {
    const { channelActions, nameToIdMap, params } = this.props;
    if (prevProps.params.channelName !== params.channelName) {
      channelActions.get(nameToIdMap.get(params.channelName));
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
        {this.props.channel && <Header {...this.props} />}
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
            {this.props.params.searchTerms && <Search {...this.props} />}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nameToIdMap: state.channels.nameToId,
  channel: state.channels.channel,
  searchResults: state.searchResults,
});

const mapDispatchToProps = dispatch => ({
  channelActions: bindActionCreators(actions.channels, dispatch),
  searchResultsActions: bindActionCreators(actions.searchResults, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
