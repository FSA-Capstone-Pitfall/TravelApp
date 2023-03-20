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

export default function BasicTimeline() {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ width: '24px', height: '24px' }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ fontSize: '1.25rem' }}>
          Start from
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ width: '24px', height: '24px' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ fontSize: '1.25rem' }}>
          NYC 6 nights
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ width: '24px', height: '24px' }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ fontSize: '1.25rem' }}>
          Boston 3 nights
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ width: '24px', height: '24px' }} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ fontSize: '1.25rem' }}>End at</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
