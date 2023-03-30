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
    if (filteredActivities) {
      let dest = [];
      filteredActivities.forEach((activity) => {
        if (dest.length > 0) {
          if (dest[dest.length - 1] !== activity.activity.destination.name) {
            dest.push(activity.activity.destination.name);
          }
        } else {
          dest.push(activity.activity.destination.name);
        }
      });
      setDestinations(dest);
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
          return (
            <TimelineItem key={i}>
              <TimelineSeparator>
                <TimelineDot sx={{ width: '24px', height: '24px' }} />
                {i === destinations.length - 1 ? null : <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ fontSize: '1.25rem' }}>
                {i === 0
                  ? `Start from ${destination}`
                  : i === destinations.length - 1
                  ? `End at ${destination}`
                  : `Head to ${destination}`}
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
