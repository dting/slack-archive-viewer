import React from 'react';
import FontAwesome from 'react-fontawesome';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../../modules';

class SearchHeader extends React.PureComponent {
  static displayName = 'SearchHeader';
  static propTypes = {
    channelName: React.PropTypes.string.isRequired,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
    searchInputActions: React.PropTypes.shape({
      update: React.PropTypes.func.isRequired,
    }),
    searchInput: React.PropTypes.shape({
      value: React.PropTypes.string,
    }).isRequired,
    searchTerms: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { router, channelName, searchInput, searchTerms } = this.props;
    if (searchInput.value && searchInput.value !== searchTerms) {
      router.push(`/messages/${channelName}/search/${searchInput.value}`);
    }
  }

  handleChange(e) {
    this.props.searchInputActions.update(e.target.value);
  }

  clearSearch() {
    this.props.searchInputActions.update('');
  }

  render() {
    return (
      <div className="flex_header">
        <div id="search_container">
          <form
            id="header_search_form"
            className="search_form no_bottom_margin"
            role="search"
            onSubmit={this.onSubmit}
          >
            <div className="icon_search_wrap">
              <FontAwesome className="ts_icon_search icon_search" aria-hidden="true" name="search" />
            </div>
            <div className="highlighter_wrapper">
              <input
                id="search_terms"
                className="search_input search_input_highlighted"
                type="text"
                placeholder="Search"
                value={this.props.searchInput.value}
                onChange={this.handleChange}
                autoComplete="off"
                maxLength="250"
                aria-label="Search"
              />
              <div className="highlighter_underlay" style={{ width: 330, marginLeft: -328 }}>
                <span className="ghost_text">&nbsp;&nbsp;</span>
              </div>
            </div>
            <div className="search_clear_icon_wrap">
              <button
                id="search_clear"
                className="search_clear_icon"
                type="button"
                aria-label="Clear search field"
                onClick={this.clearSearch}
              >
                <FontAwesome name="times-circle-o" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchInput: state.searchInput,
});

const mapDispatchToProps = dispatch => ({
  searchInputActions: bindActionCreators(actions.searchInput, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchHeader));
