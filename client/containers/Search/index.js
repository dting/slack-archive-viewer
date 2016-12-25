import FontAwesome from 'react-fontawesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import React from 'react';

import { actions } from '../../modules';

class Search extends React.Component {
  static displayName = 'Search';
  static propTypes = {
    search: React.PropTypes.shape({
      messages: React.PropTypes.arrayOf(React.PropTypes.shape({})),
      files: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    }),
    params: React.PropTypes.shape({
      channelName: React.PropTypes.string.isRequired,
      searchTerms: React.PropTypes.string.isRequired,
    }),
    searchActions: React.PropTypes.shape({
      channel: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.setMessagesTab = this.setTab.bind(this, 'messages');
    this.setFilesTab = this.setTab.bind(this, 'files');
    const { searchActions } = props;
    searchActions.channel(props.params.searchTerms);
    this.state = {
      selectedTab: 'messages',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.searchTerms !== this.props.params.searchTerms) {
      const { searchActions } = this.props;
      searchActions.channel(this.props.params.searchTerms);
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
                    Messages ({`${this.props.search.messages.length}`})
                  </button>
                  <button id="filter_files" onClick={this.setFilesTab}>
                    Files (({`${this.props.search.files.length}`})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(actions.search, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
