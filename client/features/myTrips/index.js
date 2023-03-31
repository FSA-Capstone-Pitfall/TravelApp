import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../store/slices/tripsSlice';
import TripsList from './components/tripsList';
import FindTrip from './components/findTrip';
import CreateTrip from './components/createTrip';
import { useLocation } from 'react-router-dom';

const PictureBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  height: '400px',
  marginBottom: '20px',
}));

const image =
  'https://justinkelefas.com/wp-content/uploads/2022/04/New-York-City-Sunset-sample-2.jpg';

function AllTrips() {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const itineraries = useSelector((state) => state.trips.itineraries);
  const theme = useTheme();

  let userId;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    dispatch(fetchTrips(userId));
  }, [dispatch, userId]);

  const [selectedCategory, setSelectedCategory] = useState(
    (location.state && location.state.category) || 'Upcoming'
  );

  const [openCreateTrip, setOpenCreateTrip] = useState(false);

  const statusChecker = (status) => {
    let flag = false;
    itineraries.map((itin) => {
      if (itin.status === status) {
        flag = true;
      }
    });
    return flag;
  };

  const renderContent = () => {
    if (selectedCategory === 'Upcoming') {
      if (statusChecker('upcoming')) {
        return <TripsList status={'upcoming'} itineraries={itineraries} />;
      } else {
        return <FindTrip />;
      }
    } else if (selectedCategory === 'Planning') {
      if (statusChecker('planning')) {
        return <TripsList status={'planning'} itineraries={itineraries} />;
      } else {
        return <FindTrip />;
      }
    } else if (selectedCategory === 'Complete') {
      if (statusChecker('complete')) {
        return <TripsList status={'complete'} itineraries={itineraries} />;
      } else {
        return <FindTrip />;
      }
    }
  };

  const categories = [
    { text: 'Upcoming' },
    { text: 'Planning' },
    { text: 'Complete' },
  ];

  return (
    <>
      {openCreateTrip && (
        <CreateTrip
          openCreateTrip={openCreateTrip}
          toggleDialog={setOpenCreateTrip}
        />
      )}
      <PictureBox
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40rem',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          backgroundColor: 'common.black',
        }}
      >
        <Typography color='#fff' align='center' variant='h2'>
          My Trips
        </Typography>
      </PictureBox>
      <Box sx={{ flexGrow: 1, padding: 4, mt: -3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: `calc(100% - 56px)`,
            minHeight: 'calc(100% - 56px)',
          }}
        >
          <Card
            sx={{
              width: '250px',
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => theme.shadows[4],
              overflowY: 'auto',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <List sx={{ flexGrow: 1 }}>
              {categories.map((category) => (
                <ListItem key={category.text} disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedCategory(category.text)}
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                      },
                      backgroundColor:
                        selectedCategory === category.text
                          ? theme.palette.primary.light
                          : 'inherit',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    <ListItemText primary={category.text} />
                  </ListItemButton>
                </ListItem>
              ))}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 3,
                  mb: 3,
                  flexGrow: 0,
                }}
              >
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => setOpenCreateTrip(true)}
                >
                  Create a Trip
                </Button>
              </Box>
            </List>
          </Card>
          <Box
            component='main'
            sx={{ flexGrow: 1, pl: 3, pt: 1, ml: 1, width: '100%' }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AllTrips;
