import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../../store/slices/usersSlice';
import { Box, Typography } from '@mui/material';
import ProfileTrips from './profileTrips';

const ProfileBody = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const selectedUser = useSelector((state) => state.users.userProfile);

  useEffect(() => {
    dispatch(fetchSingleUserProfile(userId));
  }, [dispatch, userId]);

  return (
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
        padding: 3,
      }}
    >
      <Box>
        <Typography color='secondary' variant='h2'>
          My Curated Trips
        </Typography>
      </Box>
      <Box>{selectedUser && <ProfileTrips />} </Box>
    </Box>
  );
};

export default ProfileBody;
