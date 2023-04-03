import React, { useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editTripActivity } from '../../../store/slices/tripsSlice';

export default function Calendar({
  city,
  activities,
  selectedTrip,
  editMode,
  onActivitiesUpdate,
  tripBlock,
  setTripBlock,
  setSelectedDay,
  setValue
}) {
  const calendarRef = useRef(null);
  const destinationColor = '#ff9f89';
  const activityColor = '#2874A6';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { tripId } = useParams();

  let userId;
  if (user) {
    userId = user.id;
  }

  const handleEventDrop = useCallback(
    ({ event }) => {
      if (event.title === 'All Trip Days') {
        const newStart = new Date(event.start);
        const originalStart = new Date(tripBlock.start);
        const dayDifference =
          (newStart - originalStart) / (24 * 60 * 60 * 1000);
        setTripBlock({
          start: newStart,
          end: new Date(event.end),
        });
        const updatedActivities = activities.map((activity) => {
          const activityStartDate = new Date(activity.date);
          const updatedStartDate = new Date(
            activityStartDate.getTime() + dayDifference * 24 * 60 * 60 * 1000
          );
          // Keep the original time values from the old start date
          updatedStartDate.setHours(activityStartDate.getHours());
          updatedStartDate.setMinutes(activityStartDate.getMinutes());
          updatedStartDate.setSeconds(activityStartDate.getSeconds());
          updatedStartDate.setMilliseconds(activityStartDate.getMilliseconds());
          return {
            ...activity,
            date: updatedStartDate,
          };
        });
        onActivitiesUpdate(updatedActivities);
        setSelectedDay(newStart)
        setValue(0)
        updatedActivities.forEach((activity) => {
          dispatch(
            editTripActivity({
              userId,
              tripId,
              activity,
              date: activity.date,
              notes: activity.notes,
            })
          );
        });
      }
    },
    [
      dispatch,
      setTripBlock,
      activities,
      tripBlock,
      userId,
      tripId,
      onActivitiesUpdate,
      setSelectedDay,
      setValue
    ]
  );

  let events = [];
  let allDestinations = [];
  let prevDest;

  if (activities) {
    activities.map((activity) => {
      let destinationName = activity.activity.destination.name;
      let startDate = new Date(activity.date);
      let duration = activity.duration * 60000;
      let buffer = activity.buffer * 60000;
      let endDate = new Date(startDate.getTime() + duration);
      if (destinationName !== prevDest) {
        allDestinations.push({
          title: destinationName,
          start: startDate,
          end: endDate,
          backgroundColor: destinationColor,
        });
        prevDest = activity.activity.destination.name;
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

  if (activities) {
    activities.map((activity) => {
      let startDate = new Date(activity.date);
      let endDate = new Date(startDate.getTime() + activity.duration * 60000);
      events.push({
        title: activity.activity.name,
        start: startDate,
        end: endDate,
        backgroundColor: activityColor,
      });
    });
  }

  if (tripBlock && editMode) {
    console.log('All trip days: ', tripBlock.start, tripBlock.end);
    events.unshift({
      title: 'All Trip Days',
      start: tripBlock.start,
      end: tripBlock.end,
      backgroundColor: 'rgba(70, 130, 180, 0.5)',
      allDay: true,
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
      editable={editMode}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      initialDate={initialDate}
      events={events}
      eventDrop={editMode ? handleEventDrop : null}
    />
  ) : null;
}
