import React, { useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar({ city, activities, selectedTrip }) {
  const calendarRef = useRef(null);

  const handleEventDrop = useCallback(({ event }) => {
    console.log('Event dropped:', event);
    // handle event drop logic here
  }, []);

  let startDate;
  let endDate;
  if (activities && activities.length > 0) {
    startDate = new Date(activities[0].itinerary_activity.date);
    endDate = new Date(
      activities[activities.length - 1].itinerary_activity.date
    );
  }

  console.log(city);

  let events = [];

  if (city) {
    events = [
      {
        title: city.name,
        start: startDate,
        end: endDate,
      },
    ];
  }

  let initialDate;
  if (events[0]) {
    if (events[0].start) {
      initialDate =
        events.length > 0 ? events[0].start.toISOString().split('T')[0] : null;
    } else {
      initialDate = new Date();
    }
  }

  return initialDate ? (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      initialView='dayGridMonth'
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      initialDate={initialDate}
      events={events}
      eventDrop={handleEventDrop}
    />
  ) : (
    <h2>Loading...</h2>
  );
}
