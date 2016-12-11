import React from 'react';

const SlackSignInButton = () => (
  <a href="/auth/slack">
    <img alt="sign_in_with_slack" src="https://api.slack.com/img/sign_in_with_slack.png" />
  </a>
);

SlackSignInButton.displayName = 'SlackSignInButton';

export default SlackSignInButton;
