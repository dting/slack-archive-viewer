import React from 'react';

import Message from './Message';

const Messages = ({ messages }) => (
  <div className="day_msgs">
    {messages.map((message, i) => (
      <Message key={message.id} message={message} prev={messages[i - 1]} />
    ))}
  </div>
);

Messages.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
  })).isRequired,
};
Messages.displayName = 'Messages';

export default Messages;
