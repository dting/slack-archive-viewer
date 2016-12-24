import classNames from 'classnames';
import React from 'react';

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
    const toggleClassName = classNames('team_menu__toggle', this.state);
    const dropdownClassName = classNames('team_menu__dropdown', this.state);
    return (
      <div className="team_menu" ref={node => (this.node = node)}>
        <button className={toggleClassName} onClick={this.toggle}>
          <div className="brand__small">{teamName}</div>
          <div className="user_name">{userName}</div>
        </button>
        <div className={dropdownClassName}>
          <button className="team_menu__item" onClick={logout}>Sign out</button>
          <button className="team_menu__item">Preferences</button>
        </div>
      </div>
    );
  }
}

export default TeamMenu;
