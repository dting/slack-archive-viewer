import React from 'react';
import moment from 'moment';

import Messages from '../Messages';

const Day = ({ day, style }) => {
  const date = moment(day.dateStr);
  return (
    <div className="day_container" style={style}>
      <div className="day_divider">
        <div className="day_divider_label">
          {`${date.format('MMMM Do, YYYY')}`}
        </div>
      </div>
      <Messages messages={day.Messages} />
    </div>
  );
};

Day.propTypes = {
  day: React.PropTypes.shape({
    dateStr: React.PropTypes.string.isRequired,
  }).isRequired,
  style: React.PropTypes.shape({}),
};
Day.displayName = 'Day';

export default Day;
