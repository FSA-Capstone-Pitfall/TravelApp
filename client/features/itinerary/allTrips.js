import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../store/slices/tripsSlice';
import { fetchCities } from '../../store/slices/citiesSlice';
import TripsList from './components/trips/tripsList';
import FeaturedTrip from './components/trips/featuredTrip';
import FindTrip from './components/trips/findTrip';
import CreateTrip from './createTrip';

const drawerWidth = 240;

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
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'left',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '1px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
  padding: theme.spacing(1),
}));

function AllTrips() {
  const dispatch = useDispatch();
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

  const [selectedCategory, setSelectedCategory] = useState('');
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
    if (selectedCategory === 'Upcoming' && statusChecker('upcoming')) {
      return (
        <>
          <Box sx={{ mb: 3 }}>
            <FeaturedTrip />
          </Box>
          <TripsList status={'upcoming'} />
        </>
      );
    } else if (selectedCategory === 'Planning' && statusChecker('planning')) {
      return <TripsList status={'planning'} />;
    } else if (selectedCategory === 'Completed' && statusChecker('completed')) {
      return <TripsList status={'complete'} />;
    } else if (selectedCategory === '') {
      return (
        <>
          <Box sx={{ mb: 3 }}>
            <FeaturedTrip />
          </Box>
          <TripsList status={'upcoming'} />
        </>
      );
    } else {
      return (
        <>
          <FindTrip />
        </>
      );
    }
  };

  const categories = [
    { text: 'Upcoming' },
    { text: 'Planning' },
    { text: 'Completed' },
  ];

  return (
    <>
      {openCreateTrip && (
        <CreateTrip
          openCreateTrip={openCreateTrip}
          toggleDialog={setOpenCreateTrip}
        />
      )}
      <PictureBox sx={{ flexGrow: 1, marginBottom: 1, minHeight: '700px' }}>
        <>
          <img
            src='https://justinkelefas.com/wp-content/uploads/2022/04/New-York-City-Sunset-sample-2.jpg'
            alt='Full-width'
          />
          <h1>My Trips</h1>
        </>
      </PictureBox>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: `calc(100% - 56px)`,
            minHeight: 'calc(100% - 56px)',
          }}
        >
          <Box
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
                  variant='contained'
                  color='primary'
                  onClick={() => setOpenCreateTrip(true)}
                >
                  Create a Trip
                </Button>
              </Box>
            </List>
          </Box>
          <Box
            component='main'
            sx={{ flexGrow: 1, pl: 3, pt: 1, width: '100%' }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AllTrips;
