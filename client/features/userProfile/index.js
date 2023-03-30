import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../store/slices/usersSlice';
import { Box, Grid } from '@mui/material';
import { ProfileColumn, ProfileBody } from './components';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUserProfile(userId));
  }, [dispatch, userId]);

  return (
    <Box sx={{ flexGrow: 1, padding: 6, display: 'flex' }}>
      <ProfileColumn />

      <ProfileBody />
    </Box>
  );
};

export default UserProfile;
