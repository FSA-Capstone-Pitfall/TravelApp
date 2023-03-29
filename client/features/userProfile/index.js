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
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3}>
          <ProfileColumn />
        </Grid>
        <Grid item xs={0} lg={9}>
          <Box sx={{ display: 'flex' }}>
            <ProfileBody />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;