import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../store/slices/tripsSlice';
import TripsList from './components/trips/tripsList';
import FeaturedTrip from './components/trips/featuredTrip';
import FindTrip from './components/trips/findTrip';
import MailIcon from '@mui/icons-material/Mail';

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
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'left',
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
  const [showUpcoming, setShowUpcoming] = useState(false);

  useEffect(() => {
    const upcomingTrips = itineraries.filter(
      (itinerary) => itinerary.status === 'upcoming'
    );
    setShowUpcoming(upcomingTrips.length > 0);
  }, [itineraries]);

  const renderContent = () => {
    if (selectedCategory === 'Upcoming' && showUpcoming) {
      return (
        <>
          <Box sx={{ mb: 3 }}>
            <FeaturedTrip />
          </Box>
          <TripsList status={'upcoming'} />
        </>
      );
    } else if (selectedCategory === 'Under Construction' && showUpcoming) {
      return <TripsList status={'planning'} />;
    } else if (selectedCategory === 'Completed' && showUpcoming) {
      return <TripsList status={'complete'} />;
    } else if (selectedCategory === '' && showUpcoming) {
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
    { text: 'Upcoming', icon: <MailIcon /> },
    { text: 'Under Construction', icon: <MailIcon /> },
    { text: 'Completed', icon: <MailIcon /> },
    { text: 'My Curated Trips', icon: <MailIcon /> },
    { text: 'Wishlist', icon: <MailIcon /> },
  ];

  return (
    <>
      <PictureBox sx={{ flexGrow: 1, marginBottom: 3, minHeight: '700px' }}>
        <>
          <img
            src='https://justinkelefas.com/wp-content/uploads/2022/04/New-York-City-Sunset-sample-2.jpg'
            alt='Full-width'
          />
          <h1>My Trips</h1>
        </>
      </PictureBox>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CustomToolbar>
            <Typography variant='h6' noWrap component='div'>
              Trips
            </Typography>
          </CustomToolbar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexGrow: 1,
              minHeight: 'calc(100% - 56px)',
            }}
          >
            <Box
              sx={{
                width: drawerWidth,
                backgroundColor: (theme) => theme.palette.background.paper,
                boxShadow: (theme) => theme.shadows[4],
                overflowY: 'auto',
              }}
            >
              <List>
                {categories.map((category) => (
                  <ListItem key={category.text} disablePadding>
                    <ListItemButton
                      onClick={() => setSelectedCategory(category.text)}
                      sx={
                        selectedCategory === category.text
                          ? {
                              borderBottom: `2px solid ${theme.palette.secondary.main}`,
                            }
                          : {}
                      }
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
                  }}
                >
                  <Button variant='contained' color='primary'>
                    Create a Trip
                  </Button>
                </Box>
              </List>
            </Box>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
              {renderContent()}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AllTrips;
