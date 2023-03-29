import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MediaControlCard from './activityCard';
import anime from 'animejs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  deleteTripActvity,
  editTripActivity,
} from '../../../store/slices/tripsSlice';

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

export default function ActivityList({
  activitiesArr,
  editMode,
  onActivityDelete,
  onActivityUpdate,
}) {
  const dispatch = useDispatch();
  const [activities, setActivities] = useState();
  const user = useSelector((state) => state.auth.user);
  const { tripId } = useParams();

  let userId;
  if (user) {
    userId = user.id;
  }

  // anime.js logic-----------------------------------------
  const observer = useRef();

  const handleObserver = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          translateY: [100, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          delay: entry.target.dataset.index * 10,
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

  //---------------------------------------------------------

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (activitiesArr) {
      setActivities(activitiesArr);
    }
  }, [activitiesArr]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tripDays = [];
  if (activities && activities.length > 0) {
    activities.map((activity) => {
      let date = new Date(activity.date);
      if (tripDays.length === 0) {
        tripDays.push(date);
      } else if (tripDays[tripDays.length - 1].getDate() !== date.getDate()) {
        tripDays.push(date);
      }
      return null;
    });
  }
  tripDays.sort((a, b) => a - b);

  const handleDelete = (activityId, tripId, userId) => {
    const updatedActivities = activities.filter((activity) => {
      return activity.id !== activityId;
    });
    setActivities(updatedActivities);
    onActivityDelete(updatedActivities);
    dispatch(deleteTripActvity({ userId, tripId, activityId }));
  };

  const handleUpdate = ({ activity, date, notes }) => {
    const updatedActivities = activities.map((element) => {
      if (activity.id === element.id) {
        return {
          ...element,
          date: date,
          notes: notes,
        };
      }
      return element;
    });
    setActivities(updatedActivities);
    onActivityUpdate(updatedActivities);
    dispatch(
      editTripActivity({
        userId,
        tripId,
        activity,
        date,
        notes,
      })
    );
  };

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
                new Date(activity.date).getDate() === day.getDate() ? (
                  <Box
                    sx={{
                      marginBottom: '16px',
                    }}
                    key={activity.id}
                  >
                    <MediaControlCard
                      activity={activity}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                      data-index={index}
                      editMode={editMode}
                      tripId={tripId}
                      userId={userId}
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
