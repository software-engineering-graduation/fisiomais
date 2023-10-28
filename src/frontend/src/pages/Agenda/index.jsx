import React from 'react';
import { Badge } from 'antd';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Agenda.scss';

const localizer = momentLocalizer(moment);

function getListData(date) {
  let listData;
  if (date.getDate() === 6) {
    listData = [
      { type: 'appointment', title: 'Mr. Bajindul', description: '07:30 - 09:00 AM' },
      { type: 'appointment', title: 'Mr. Bajindul', description: '10:30 - 12:00 AM' },
    ];
  }
  return listData || [];
}

const Agenda = () => {
  const events = [
    {
      start: new Date(2023, 9, 6, 7, 30),
      end: new Date(2023, 9, 6, 9, 0),
      title: 'Mr. Bajindul 07:30 - 09:00 AM',
    },
  ];

  return (
    <div className="calendar-container">
      <h1>Agenda</h1>
      <BigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "500px" }}
        eventPropGetter={(event, start, end, isSelected) => {
          const data = getListData(start);
          let style = {};
          if (data.length > 0) {
            style = {
              backgroundColor: '#1890ff',
              borderRadius: '5px',
              opacity: 0.8,
            };
          }
          return { style };
        }}
      />
    </div>
  )
};

export default Agenda;
