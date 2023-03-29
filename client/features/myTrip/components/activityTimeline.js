import React, { useEffect, useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from '@mui/lab';

export default function ActivityTimeline({ activities, city, tripDuration }) {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    if (activities) {
      let dest = [];
      activities.forEach((activity) => {
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
  }, [activities]);

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
