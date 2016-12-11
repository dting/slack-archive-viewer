import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import SideBar from './SideBar';
import { actions } from '../../modules';

class Archives extends React.Component {
  static propTypes = {
    channelActions: React.PropTypes.shape({
      list: React.PropTypes.func.isRequired,
    }).isRequired,
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.props.channelActions.list();
  }

  render() {
    return (
      <div className="archives">
        <SideBar {...this.props} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  channelList: state.channels,
});

const mapDispatchToProps = dispatch => ({
  channelActions: bindActionCreators(actions.channels, dispatch),
  logout: bindActionCreators(actions.auth.logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Archives);
