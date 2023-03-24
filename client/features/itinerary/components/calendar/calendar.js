import React, { useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar({ city, activities, selectedTrip }) {
  const calendarRef = useRef(null);

  const handleEventDrop = useCallback(({ event }) => {
    // console.log('Event dropped:', event);
    // handle event drop logic here
  }, []);

  let events = [];
  let allDestinations = [];
  let prevDest;

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
    console.log(allDestinations);
    console.log(events);
  }

  if (activities) {
    // console.log(selectedTrip.itinerary);
    activities.map((activity) => {
      let startDate = new Date(activity.itinerary_activity.date);
      let endDate = new Date(
        startDate.getTime() + activity.itinerary_activity.duration * 60000
      );
      events.push({ title: activity.name, start: startDate, end: endDate });
    });
  }

  // if (city) {
  //   events = [
  //     {
  //       title: city.name,
  //       start: startDate,
  //       end: endDate,
  //     },
  //     {
  //       title: destination.name,
  //       start: startDate,
  //       end: endDate,
  //     },
  //     {
  //       title: activity.name,
  //       start: startDate,
  //       end: endDate,
  //     },
  //   ];
  // }

  const initialDate =
    events.length > 0 ? events[0].start.toISOString().split('T')[0] : null;

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
