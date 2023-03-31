import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../../store/slices/usersSlice';
import { Box, Typography } from '@mui/material';
import ProfileTrips from './profileTrips';
import { FindTrip } from '../../myTrips/components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ProfileBody = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const selectedUser = useSelector((state) => state.users.userProfile);

  useEffect(() => {
    dispatch(fetchSingleUserProfile(userId));
  }, [dispatch, userId]);

  const userProfileId = selectedUser && selectedUser.id;

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          maxWidth: '1200px',
          gap: '0.5rem',
          marginLeft: '4rem',
          border: '1px solid #ccc',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
          borderRadius: 5,
          padding: 5,
        }}
      >
        <Box>
          <Typography
            color='secondary'
            variant='h2'
            sx={{ mb: 2, letterSpacing: 1 }}
          >
            My Curated Trips
          </Typography>
        </Box>
        <Box>{userProfileId && <ProfileTrips userId={userProfileId} />} </Box>
        <Box>
          <FindTrip />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          maxWidth: '1200px',
          gap: '0.5rem',
          marginLeft: '4rem',
          border: '1px solid #ccc',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
          borderRadius: 5,
          padding: 5,
        }}
      >
        <Box>
          <Typography
            color='secondary'
            variant='h2'
            sx={{ mb: 2, letterSpacing: 1 }}
          >
            My Photos
          </Typography>
        </Box>
        <Box sx={{ mt: -2, mb: -2 }}>
          {' '}
          <ImageList
            sx={{ width: 500, height: 445 }}
            variant='quilted'
            cols={4}
            rowHeight={121}
          >
            {itemData.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Box>
    </>
  );
};

export default ProfileBody;

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    cols: 2,
  },
];
