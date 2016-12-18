import React from 'react';
import moment from 'moment';
import slackdown from 'slackdown';
import Remarkable from 'remarkable';
import hljs from 'highlight.js';
import cns from 'classnames';

import { htmlDecode } from '../../../../utils';
import Attachment from '../Attachment';

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
  const first = !prev || (message.User && prev.User && (message.User.userId !== prev.User.userId));
  const timestamp = moment(message.timestamp);
  const __html = md.render(slackdown.parse(message.text || ''));
  return (
    <div className="message">
      <div className="message_gutter">
        {first && message.User && (
          <div className="message_icon">
            <span
              className="member_image thumb_36"
              style={{ backgroundImage: `url('${message.User.profile.image_48}')` }}
              alt={message.User.userName}
            />
          </div>
        )}
        {!first && (
          <div className="message__meta__time">{timestamp.format('h:mm A')}</div>
        )}
      </div>
      <div className="message_content">
        <div className="message_content_header">
          <div className="message_content_header_left">
            {first && message.User && (
              <div className="message__info">
                <div className="message_sender">
                  {message.User.userName}
                </div>
                <span className="timestamp">
                  {timestamp.format('h:mm A')}
                </span>
              </div>
            )}
          </div>
        </div>
        <span className={cns('message_body', { first })}>
          <span
            dangerouslySetInnerHTML={{ __html }} // eslint-disable-line react/no-danger
          />
          {message.attachments && message.attachments.map((attachment, i) => (
            <Attachment key={i} attachment={attachment} />
          ))}
        </span>
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
