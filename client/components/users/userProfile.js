import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../store/slices/usersSlice';
import { Box, Grid } from '@mui/material';
import ProfileColumn from './profileColumn';
import ProfileBody from './profileBody';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUserProfile(userId));
  }, [dispatch, userId]);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <ProfileColumn />
        </Grid>
        <Grid item xs={9}>
          <ProfileBody />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
