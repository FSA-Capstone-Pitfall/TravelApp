import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MapWithMarkers from '../components/map';
import ActivityTimeline from './components/activityTimeline';
import Calendar from './components/calendar';
import ActivityList from './components/activityList';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editTripName, fetchSingleTrip } from '../../store/slices/tripsSlice';

const Item = styled(Box)(({ theme }) => ({
  padding: 25,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PictureBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  height: '400px',
  marginBottom: '20px',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& h1': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  '& h3': {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '2rem',
  },
}));

function MyTrip() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [activities, setActivities] = useState();
  const [city, setCity] = useState();
  const [tripName, setTripName] = useState();
  const [editMode, setEditMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [tripBlock, setTripBlock] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const selectedTrip = useSelector((state) => state.trips.itineraries);

  let userId;
  if (user) {
    userId = user.id;
  }

  const getFirstDay = (activities) => {
    let firstDay = null;

    activities.forEach((activity) => {
      const activityDate = new Date(activity.date);

      if (firstDay === null || activityDate < firstDay) {
        firstDay = activityDate;
      }
    });

    return firstDay;
  };

  function comparePositions(a, b) {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA - dateB;
  }

  const handleActivityDelete = (updatedActivities) => {
    updatedActivities.sort(comparePositions);
    setActivities(updatedActivities);
  };

  const handleActivityUpdate = (updatedActivities) => {
    updatedActivities.sort(comparePositions);
    setActivities(updatedActivities);
  };

  const handleNameChange = (name) => {
    setTripName(name);
    dispatch(
      editTripName({
        userId,
        tripId,
        name: name,
      })
    );
  };

  useEffect(() => {
    const pullData = async () => {
      const userTrip = await dispatch(fetchSingleTrip({ userId, tripId }));
      setTripName(userTrip.payload.itinerary.name);
      let activitiesArr;
      activitiesArr = [...userTrip.payload.itinerary.itinerary_activities];
      activitiesArr.sort(comparePositions);
      setActivities(activitiesArr);
      setSelectedDay(getFirstDay(activitiesArr));
      setCity(userTrip.payload.itinerary.city);
    };
    pullData();
  }, [dispatch, userId, tripId]);

  useEffect(() => {
    if (activities && activities.length > 0) {
      const firstDay = getFirstDay(activities);
      const lastDay = new Date(activities[activities.length - 1].date);
      setTripBlock({
        start: firstDay,
        end: new Date(lastDay.getTime() + 24 * 60 * 60 * 1000),
      });
    }
  }, [activities]);

  let destinations = [];
  if (activities && activities.length > 0) {
    const filteredActivities = activities.filter((activity) => {
      return (
        selectedDay &&
        new Date(activity.date).getDate() === selectedDay.getDate()
      );
    });
    const locations = filteredActivities.map((item) => {
      const coordinates = item.activity.googleMap.split(',');
      return {
        lat: parseFloat(coordinates[0]),
        lng: parseFloat(coordinates[1]),
      };
    });
    destinations = locations;
  }

  let tripDuration = 0;
  if (activities && activities.length > 0) {
    const startDate = new Date(activities[0].date);
    const endDate = new Date(activities[activities.length - 1].date);
    tripDuration = Math.round((endDate - startDate) / 86400000);
  }
  return (
    <>
      {city ? (
        <PictureBox
          sx={{
            mb: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            backgroundColor: 'common.black',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${city.imageUrl})`,
          }}
        >
          <h1
            contentEditable={editMode ? true : false}
            onBlur={(e) => {
              handleNameChange(e.target.innerText);
            }}
            suppressContentEditableWarning={true}
            style={
              editMode
                ? {
                    backgroundColor: 'darkgray',
                    border: '2px solid black',
                    borderRadius: '4px',
                    padding: '4px',
                  }
                : null
            }
          >
            {tripName}
          </h1>
          <h3>{city.name}</h3>
        </PictureBox>
      ) : (
        <h3>Add activity to see details</h3>
      )}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={2} sx={{ display: 'flex' }}>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item sx={{ marginBottom: 1 }}>
                  <h2>Trip Timeline</h2>
                  <ActivityTimeline
                    selectedDay={selectedDay}
                    activities={activities}
                    city={city}
                    tripDuration={tripDuration}
                  />
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ marginBottom: 1 }}>
                  {destinations.length > 0 ? (
                    <MapWithMarkers destinations={destinations} />
                  ) : (
                    <h3>Add activity to see map</h3>
                  )}
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ marginBottom: 1 }}>
                  <Calendar
                    onActivitiesUpdate={handleActivityUpdate}
                    tripBlock={tripBlock}
                    setTripBlock={setTripBlock}
                    selectedDay={selectedDay}
                    activities={activities}
                    city={city}
                    selectedTrip={selectedTrip}
                    editMode={editMode}
                  />
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item sx={{ marginBottom: 1 }}>
                  <Box sx={{ marginBottom: '16px' }}>
                    <Box sx={{ marginBottom: '16px' }}>
                      <Button
                        variant='contained'
                        size='large'
                        sx={{ display: 'block', width: '100%' }}
                      >
                        Travel Companions
                      </Button>
                    </Box>
                    <Box sx={{ marginBottom: '16px' }}>
                      <Button
                        variant='contained'
                        size='large'
                        sx={{ display: 'block', width: '100%' }}
                        onClick={() => setEditMode(!editMode)}
                      >
                        {editMode ? <>Cancel Edit</> : <>Edit Trip</>}
                      </Button>
                    </Box>
                    {editMode ? (
                      <>
                        <Box sx={{ marginBottom: '16px' }}>
                          <Button
                            variant='contained'
                            size='large'
                            sx={{
                              display: 'block',
                              width: '100%',
                              textDecoration: 'none',
                            }}
                            onClick={() =>
                              navigate('/activities', {
                                state: {
                                  cityId: city.id,
                                  imageUrl: city.imageUrl,
                                  displayName: city.name,
                                },
                              })
                            }
                          >
                            Add More Activities
                          </Button>
                        </Box>
                      </>
                    ) : null}
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'left' }}>
            <Box sx={{ maxHeight: '1200px', overflowY: 'auto', flex: 1 }}>
              <Item>
                <h2>Trip Details</h2>
                <ActivityList
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  activitiesArr={activities}
                  editMode={editMode}
                  onActivityDelete={handleActivityDelete}
                  onActivityUpdate={handleActivityUpdate}
                />
              </Item>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MyTrip;
