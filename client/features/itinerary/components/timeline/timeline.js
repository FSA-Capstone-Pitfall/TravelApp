import * as React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from '@mui/lab';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function BasicTimeline({ activities }) {
  let destinations = [];

  if (activities) {
    activities.map((activity) => {
      if (destinations.length > 0) {
        if (
          destinations[destinations.length - 1] !== activity.destination.name
        ) {
          destinations.push(activity.destination.name);
        }
      } else {
        destinations.push(activity.destination.name);
      }
    });
  }

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
        <h2>Loading...</h2>
      )}
    </Timeline>
  );
}
