import React from 'react';
import cns from 'classnames';

import { attachmentImageStyle, htmlDecode } from '../../../../utils';

const Attachment = ({ attachment }) => (
  <div className="attachment_group has_border">
    <div className="inline_attachment standalone can_delete">
      <div className="msg_inline_attachment_column column_border" />
      <div
        className={cns('msg_inline_attachment_column', 'column_content',
          { has_thumb: attachment.thumb_url },
        )}
      >
        {attachment.service_name &&
          <div className="msg_inline_attachment_row attachment_flush_text attachment_source">
            {attachment.service_icon &&
              <span className="attachment_source_icon">
                {attachment.service_url ? (
                  <a href={attachment.service_url}>
                    <img
                      className="attachment_source_icon"
                      src={attachment.service_icon}
                      alt={attachment.service_name}
                    />
                  </a>
                ) : (
                  <img
                    className="attachment_source_icon"
                    src={attachment.service_icon}
                    alt={attachment.service_name}
                  />
                )}
              </span>
            }
            <span className="attachment_source_name">
              {attachment.service_url ? (
                <a href={attachment.service_url}>
                  {attachment.service_name}
                </a>
              ) : (
                attachment.service_name
              )}
            </span>
            {attachment.author_name &&
              <span className="attachment_author_name">
                <a href={attachment.author_link}>
                  {attachment.author_name}
                </a>
              </span>
            }
          </div>
        }
        <div className="msg_inline_attachment_row attachment_flush_text">
          <div className="attachment_title">
            {attachment.title_link ? (
              <a href={attachment.title_link} target="_blank" rel="noopener noreferrer">
                {attachment.title}
              </a>
            ) : (
              attachment.title
            )}
          </div>
          {attachment.text &&
            <span className="short_text">{htmlDecode(attachment.text)}</span>
          }
        </div>
      </div>
      {attachment.thumb_url && !attachment.image_url && !attachment.video_html &&
        <div className="msg_inline_attachment_column column_thumb">
          <div className="msg_inline_attachment_row">
            <a href={attachment.title_link} target="_blank" rel="noopener noreferrer">
              <div
                className="msg_inline_attachment_thumb_holder"
                style={{ backgroundImage: `url('${attachment.thumb_url}')` }}
              >
                <img
                  className="msg_inline_attachment_thumb"
                  src={attachment.thumb_url}
                  alt={attachment.title}
                />
              </div>
            </a>
          </div>
        </div>
      }
      {(attachment.image_url || attachment.video_html) &&
        <div className="msg_inline_attachment_row attachment_media">
          {attachment.image_url &&
            <div className="clear_both msg_inline_img_holder msg_inline_holder msg_inline_holder_rounded file_container_fixed_dimensions">
              <a
                className="file_viewer_external_link"
                href={attachment.title_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="msg_inline_img_container">
                  <div
                    className="file_preview_preserve_aspect_ratio"
                    style={attachmentImageStyle(attachment)}
                  >
                    <figure className="msg_inline_img msg_inline_child">
                      <img src={attachment.image_url} alt={attachment.title} />
                    </figure>
                  </div>
                </div>
              </a>
            </div>
          }
          {attachment.video_html &&
            <div
              className="clear_both msg_inline_video_holder msg_inline_holder"
              style={{ width: 400, height: 300, maxWidth: '100%' }}
            >
              <div className="msg_inline_video_thumb_div">
                <img
                  className="msg_inline_video msg_inline_child"
                  src={attachment.thumb_url}
                  alt={attachment.title}
                />
              </div>
            </div>
          }
        </div>
      }
    </div>
  </div>
);

Attachment.propTypes = {
  attachment: React.PropTypes.shape({
    service_icon: React.PropTypes.string,
    service_name: React.PropTypes.string,
  }),
};

export default Attachment;
