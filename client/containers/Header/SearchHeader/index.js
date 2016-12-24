import React from 'react';
import FontAwesome from 'react-fontawesome';

const SearchHeader = () => (
  <div className="flex_header">
    <div id="search_container">
      <form role="search" method="get" action="/search" id="header_search_form" className="search_form no_bottom_margin">
        <div className="icon_search_wrap">
          <FontAwesome className="ts_icon_search icon_search" aria-hidden="true" name="search" />
        </div>
        <div className="highlighter_wrapper">
          <input type="text" id="search_terms" name="q" className="search_input search_input_highlighted" placeholder="Search" autoComplete="off" maxLength="250" aria-label="Search" />
          <div className="highlighter_underlay" style={{ width: 330, marginLeft: -328 }}>
            <span className="ghost_text">&nbsp;&nbsp;</span>
          </div>
        </div>
        <div className="search_clear_icon_wrap">
          <a id="search_clear" className="search_clear_icon" aria-label="Clear search field">
            <FontAwesome name="times-circle-o" aria-hidden="true" />
          </a>
        </div>
      </form>
    </div>
  </div>
);

SearchHeader.displayName = 'SearchHeader';
SearchHeader.propTypes = {
};

export default SearchHeader;
