import React, { useEffect, useState, useMemo } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from '@mui/lab';

export default function BasicTimeline({
  activities,
  city,
  tripDuration,
  selectedDay,
}) {
  const [destinations, setDestinations] = useState([]);

  const filteredActivities = useMemo(() => {
    if (selectedDay) {
      return activities.filter(
        (activity) =>
          new Date(activity.date).getDate() === selectedDay.getDate()
      );
    }
    return activities;
  }, [activities, selectedDay]);

  useEffect(() => {
    let allDestinations = [];
    let prevDest;
    let startDate;
    let destinationName;
    let duration;
    let endDate;
    if (filteredActivities) {
      filteredActivities.map((activity, index) => {
        duration = activity.duration * 60000;
        destinationName = activity.activity.destination.name;
        if (index === 0) {
          startDate = new Date(activity.date);
          endDate = new Date(startDate.getTime() + duration);
          prevDest = activity.activity.destination.name;
        }
        if (destinationName !== prevDest) {
          allDestinations.push({
            title: destinationName,
            start: startDate,
            end: endDate,
          });
          startDate = new Date(activity.date);
          endDate = new Date(startDate.getTime() + duration);
        } else {
          endDate = new Date(activity.date);
          endDate = new Date(endDate.getTime() + duration);
        }
        if (index === filteredActivities.length - 1) {
          allDestinations.push({
            title: destinationName,
            start: startDate,
            end: endDate,
          });
        }
        return null;
      });
      setDestinations([...allDestinations]);
    }
  }, [filteredActivities]);

  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {destinations ? (
        destinations.map((destination, i) => {
          const destinationDuration = `${destination.start.getHours()}:${destination.start
            .getMinutes()
            .toString()
            .padStart(2, '0')} - ${destination.end.getHours()}:${destination.end
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
          return (
            <TimelineItem key={i}>
              <TimelineSeparator>
                <TimelineDot sx={{ width: '24px', height: '24px' }} />
                {i === destinations.length - 1 ? null : <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ fontSize: '1.25rem' }}>
                {i === 0
                  ? `Start from ${destination.title} ${destinationDuration}`
                  : i === destinations.length - 1
                  ? `End at ${destination.title} ${destinationDuration}`
                  : `Head to ${destination.title}  ${destinationDuration}`}
              </TimelineContent>
            </TimelineItem>
          );
        })
      ) : (
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ width: '24px', height: '24px' }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ fontSize: '1.25rem' }}></TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
}
