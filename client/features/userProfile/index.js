import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../store/slices/usersSlice';
import { Box } from '@mui/material';
import { ProfileColumn, ProfileBody } from './components';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleUserProfile(userId));
  }, [dispatch, userId]);

  return (
    <Box
      sx={{
        flex: '0 1 auto',
        padding: 6,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <ProfileColumn />

      <ProfileBody />
    </Box>
  );
};

export default UserProfile;
