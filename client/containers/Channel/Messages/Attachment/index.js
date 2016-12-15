import React from 'react';
import slackdown from 'slackdown';

const e = document.createElement('div');
const htmlDecode = function htmlDecode(input) {
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

const Attachment = ({ attachment }) => (
  <div className="attachment">
    <div className="attachment__bar" />
    <div className="attachment__body">
      {attachment.service_name &&
        <div className="attachment__service">
          <span className="attachment__service__icon">
            <img
              className="attachment__service__icon__image"
              src={attachment.service_icon}
              alt={attachment.service_name}
            />
          </span>
          <span className="attachment__service__name">
            {attachment.service_name}
          </span>
          {attachment.author_name &&
            <span className="attachment__service__author-name">
              <a href={attachment.author_link}>
                {attachment.author_name}
              </a>
            </span>
          }
        </div>
      }
      <div className="attachment__title">
        <a href={attachment.title_link} target="_blank" rel="noopener noreferrer">
          {attachment.title}
        </a>
      </div>
      <div className="attachment__text">
        {htmlDecode(slackdown.parse(attachment.text || ''))}
      </div>
    </div>
    {attachment.thumb_url &&
      <div className="attachment__thumb">
        <a href={attachment.title_link}>
          <div
            className="attachment__thumb__image-holder"
            style={{ backgroundImage: `url(${attachment.thumb_url})` }}
          >
            <img src={attachment.thumb_url} alt={attachment.title} />
          </div>
        </a>

      </div>
    }
  </div>
);

Attachment.propTypes = {
  attachment: React.PropTypes.shape({
    service_icon: React.PropTypes.string,
    service_name: React.PropTypes.string,
  }),
};

export default Attachment;
