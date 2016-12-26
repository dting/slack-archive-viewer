import { AutoSizer } from 'react-virtualized';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import React from 'react';

import Message from '../Main/Messages/Message';
import { actions } from '../../modules';

class Search extends React.Component {
  static displayName = 'Search';
  static propTypes = {
    searchResults: React.PropTypes.shape({
      messages: React.PropTypes.arrayOf(React.PropTypes.shape({})),
      files: React.PropTypes.arrayOf(React.PropTypes.shape({})),
      searchTerms: React.PropTypes.string.isRequired,
    }),
    params: React.PropTypes.shape({
      channelName: React.PropTypes.string.isRequired,
      searchTerms: React.PropTypes.string.isRequired,
    }),
    searchResultsActions: React.PropTypes.shape({
      channel: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.setMessagesTab = this.setTab.bind(this, 'messages');
    this.setFilesTab = this.setTab.bind(this, 'files');
    this.state = {
      selectedTab: 'messages',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.searchTerms !== this.props.params.searchTerms) {
      const { searchResultsActions } = this.props;
      searchResultsActions.channel();
      this.state = { selectedTab: 'messages' };
    }
  }

  setTab(selectedTab) {
    if (this.state.selectedTab !== selectedTab) {
      this.setState({ selectedTab });
    }
  }

  render() {
    return (
      <div id="col_flex">
        <div id="flex_contents" role="complementary" className="tab_panels tab_container">
          <div id="search_tab" className="panel">
            <div id="search_results_container">
              <div className="heading">
                <div id="search_heading" className="inline_block">Search Results</div>
                <Link
                  to={`/messages/${this.props.params.channelName}/`}
                  className="close_flexpane small_left_margin"
                >
                  <FontAwesome name="close" />
                </Link>
              </div>
              <div id="search_tabs">
                <div id="search_filters" className={this.state.selectedTab}>
                  <button id="filter_messages" onClick={this.setMessagesTab}>
                    Messages ({`${this.props.searchResults.messages.length}`})
                  </button>
                  <button id="filter_files" onClick={this.setFilesTab}>
                    Files (({`${this.props.searchResults.files.length}`})
                  </button>
                </div>
              </div>

              <AutoSizer>
                {({ height, width }) => (
                  <div id="search_results" className="flex_content_scroller" style={{ height, width }}>
                    <div id="search_results_items">
                      {!this.props.searchResults.messages.length && (
                        <p className="no_results">
                          No messages found matching:<br />
                          <strong>{`${this.props.searchResults.searchTerms}`}</strong>.
                        </p>
                      )}
                      {this.props.searchResults.messages.length && (
                        <div id="search_message_results">
                          {this.props.searchResults.messages.map(message => (
                            <div className="search_message_result" key={message.ts}>
                              <div className="search_message_result_meta display_flex black indifferent_grey align_items_end">
                                <div className="small_right_margin">
                                  #{this.props.params.channelName}
                                </div>
                                <div className="date_links flex_none auto_left_margin normal">
                                  <span className="search_message_item_timestamp">
                                    {moment(message.timestamp).format('MMM Do')}
                                  </span>
                                </div>
                              </div>
                              <div className="search_message_result_text">
                                <div className="search_result_with_extract">
                                  <Message message={message} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </AutoSizer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults,
});

const mapDispatchToProps = dispatch => ({
  searchResultsActions: bindActionCreators(actions.searchResults, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
