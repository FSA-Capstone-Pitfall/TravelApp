import React, { useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar({ city, activities, selectedTrip }) {
  const calendarRef = useRef(null);
  const destinationColor = '#ff9f89';
  const activityColor = '#2874A6';

  const handleEventDrop = useCallback(({ event }) => {
    // handle event drop logic here
  }, []);

  let events = [];
  let allDestinations = [];
  let prevDest;

  // dates for visting specific destinations (e.g. Brooklyn dates, Queens dates, etc.)
  if (activities) {
    activities.map((activity) => {
      let destinationName = activity.destination.name;
      let startDate = new Date(activity.itinerary_activity.date);
      let duration = activity.itinerary_activity.duration * 60000;
      let buffer = activity.itinerary_activity.buffer * 60000;
      let endDate = new Date(startDate.getTime() + duration);
      if (destinationName !== prevDest) {
        allDestinations.push({
          title: destinationName,
          start: startDate,
          end: endDate,
          backgroundColor: destinationColor,
        });
        prevDest = activity.destination.name;
      } else {
        allDestinations[allDestinations.length - 1].end = new Date(
          allDestinations[allDestinations.length - 1].end.getTime() +
            duration +
            buffer
        );
      }

      return null;
    });
    events = [...allDestinations];
  }

  // dates for all the individual activities (e.g. the MET musuem, Statue of Liberty, Brooklyn Bridge)
  if (activities) {
    activities.map((activity) => {
      let startDate = new Date(activity.itinerary_activity.date);
      let endDate = new Date(
        startDate.getTime() + activity.itinerary_activity.duration * 60000
      );
      events.push({
        title: activity.name,
        start: startDate,
        end: endDate,
        backgroundColor: activityColor,
      });
    });
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

  events.push({
    title: 'TEST',
    start: '2023-07-12T10:00:00',
    end: '2023-07-12T16:00:00',
    display: 'background',
    color: '#ff9f89',
  });

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
      eventDisplay='block'
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
