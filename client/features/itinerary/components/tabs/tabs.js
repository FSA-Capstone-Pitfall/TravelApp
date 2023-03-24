import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BasicTimeline from '../timeline/timeline';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs({ city, activities, selectedTrip }) {
  const [value, setValue] = useState(0);
  const [overallFlag, setOverallFlag] = useState(true);

  useEffect(() => {
    if (value === 0) {
      setOverallFlag(true);
    } else {
      setOverallFlag(false);
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tripDuration = 0;
  if (activities && activities.length > 0) {
    const startDate = new Date(activities[0].itinerary_activity.date);
    const endDate = new Date(
      activities[activities.length - 1].itinerary_activity.date
    );
    tripDuration = Math.round((endDate - startDate) / 86400000);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='trip tabs'>
          <Tab label='Complete Trip' />
          {city ? <Tab label={city.name} /> : null}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicTimeline
          activities={activities}
          city={city}
          overallFlag={overallFlag}
          tripDuration={tripDuration}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BasicTimeline
          activities={activities}
          city={city}
          overallFlag={false}
        />
      </TabPanel>
    </Box>
  );
}
