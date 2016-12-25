import React from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

class TeamMenu extends React.PureComponent {
  static displayName = 'TeamMenu';
  static propTypes = {
    logout: React.PropTypes.func.isRequired,
    user: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      slack: React.PropTypes.shape({
        team: React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick, false);
    document.addEventListener('touchend', this.onDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, false);
    document.removeEventListener('touchend', this.onDocumentClick, false);
  }

  onDocumentClick(evt) {
    if (!this.node.contains(evt.target)) {
      this.setState({ open: false });
    }
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { logout, user } = this.props;
    const userName = user.name;
    const teamName = user.slack.team.name;
    const toggleClassName = classNames('team_menu_toggle', this.state);
    const dropdownClassName = classNames('team_menu_dropdown', this.state);
    return (
      <div id="team_menu" ref={node => (this.node = node)}>
        <button className={toggleClassName} onClick={this.toggle}>
          <div className="team_name_container">
            <span id="team_name" className="overflow_ellipsis">{teamName}</span>
          </div>
          <div id="presence_container">
            <FontAwesome name="circle-o" style={{ opacity: 0.98 }} id="presence" />
          </div>
          <span id="team_header_user_name" className="current_user_name overflow_ellipsis">{userName}</span>
        </button>
        <div className={dropdownClassName}>
          <button className="team_menu_item" onClick={logout}>Sign out</button>
          <button className="team_menu_item">Preferences</button>
        </div>
      </div>
    );
  }
}

export default TeamMenu;
