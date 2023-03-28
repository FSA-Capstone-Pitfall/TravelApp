import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MediaControlCard from './activityCard';
import anime from 'animejs';

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

export default function ActivityList({ activitiesArr }) {
  const [activities, setActivities] = useState();

  const observer = useRef();

  const handleObserver = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          translateY: [100, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          delay: entry.target.dataset.index * 100,
        });
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px -100px 0px',
      threshold: 0,
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (activities) {
      const allCards = document.querySelectorAll('.activity-card');
      allCards.forEach((card) => {
        observer.current.observe(card);
      });
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [activities]);

  const handleDelete = (activityId) => {
    // Update your activities state
    setActivities(activities.filter((activity) => activity.id !== activityId));
  };

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
    } else {
    }
    if (activitiesArr) {
      setActivities(activitiesArr);
    }
  }, [value, activitiesArr]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tripDays = [];
  if (activities && activities.length > 0) {
    activities.map((activity) => {
      let date = new Date(activity.itinerary_activity.date);
      if (tripDays.length === 0) {
        tripDays.push(date);
      } else if (tripDays[tripDays.length - 1].getDate() !== date.getDate()) {
        tripDays.push(date);
      }
      return null;
    });
  }

  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='trip tabs'>
          {tripDays.map((day, index) => {
            return (
              <Tab
                key={index}
                label={`${days[day.getDay()]} (${
                  day.getMonth() + 1
                }/${day.getDate()})`}
              />
            );
          })}
        </Tabs>
      </Box>
      {tripDays.map((day, index) => {
        return (
          <TabPanel value={value} index={index} key={index}>
            {activities &&
              activities.map((activity, index) =>
                new Date(activity.itinerary_activity.date).getDate() ===
                day.getDate() ? (
                  <Box
                    sx={{
                      marginBottom: '16px',
                    }}
                    key={activity.id}
                  >
                    <MediaControlCard
                      activity={activity}
                      onDelete={handleDelete}
                      data-index={index} // Add this line
                    />
                  </Box>
                ) : null
              )}
          </TabPanel>
        );
      })}
    </Box>
  );
}
