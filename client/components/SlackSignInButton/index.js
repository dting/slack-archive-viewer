import React from 'react';
import OAuthPopup from '../OAuthPopup';

import slackButtonImage from './sign_in_with_slack.png';

const SlackSignInButton = () => (
  <OAuthPopup provider="slack" url={'/auth/slack/'}>
    <img alt="sign_in_with_slack" src={slackButtonImage} />
  </OAuthPopup>
);

SlackSignInButton.displayName = 'SlackSignInButton';

export default SlackSignInButton;
