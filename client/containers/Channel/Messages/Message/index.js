import React from 'react';
import moment from 'moment';
import slackdown from 'slackdown';
import Remarkable from 'remarkable';
import hljs from 'highlight.js';

const e = document.createElement('div');
const htmlDecode = function htmlDecode(input) {
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

const md = new Remarkable({
  html: true,
  highlight(encodedStr, lang) {
    const str = htmlDecode(encodedStr);
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {
        // highlight error
      }
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {
      // auto highlight error
    }
    return ''; // use external default escaping
  },
});

const Message = ({ message, prev }) => {
  const isContinuation = prev && message.User && prev.User &&
    message.User.userId === prev.User.userId;
  const timestamp = moment(message.timestamp);
  const __html = md.render(slackdown.parse(message.text || ''));
  return (
    <div className="message">
      <div className="message__meta">
        {!isContinuation && message.User && (
          <img
            className="message__meta__avatar"
            src={message.User.profile.image_48}
            alt={message.User.userName}
          />
        )}
      </div>
      <div className="message__body">
        {!isContinuation && message.User && (
          <div className="message__info">
            <div className="message__info__username">
              {message.User.userName}
            </div>
            <div className="message__info__time">
              {timestamp.format('h:mm A')}
            </div>
          </div>
        )}
        <div
          className={message.subtype}
          dangerouslySetInnerHTML={{ __html }} // eslint-disable-line react/no-danger
        />
      </div>
    </div>
  );
};

Message.propTypes = {
  message: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
  }).isRequired,
  prev: React.PropTypes.shape({
    User: React.PropTypes.shape({
      userId: React.PropTypes.number,
    }),
  }),
};
Message.displayName = 'Message';

export default Message;
