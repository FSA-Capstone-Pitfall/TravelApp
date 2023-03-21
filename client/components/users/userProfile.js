import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../store/slices/usersSlice';
import { Box, Avatar, Grid } from '@mui/material';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const selectedUser = useSelector((state) => state.users.userProfile);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userState, setUserState] = useState('');
  const [city, setCity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    dispatch(fetchSingleUserProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setCity(selectedUser.city);
      setUserState(selectedUser.state);
      setImageUrl(selectedUser.imageUrl);
    }
  }, [selectedUser]);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={8} sx={{ ml: 3, mr: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={6} md={4}>
              <Avatar src={imageUrl} sx={{ height: '200px', width: '200px' }} />
            </Grid>
            <Grid
              item
              xs={6}
              md={8}
              sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
              This is where all of the trips will be rendered.
            </Grid>
            <Grid
              item
              xs={6}
              md={4}
              sx={{ textAlign: 'left', display: 'inline-block' }}
            >
              <Grid item sx={{ mb: 1 }}>
                {firstName} {lastName}
              </Grid>
              <Grid item sx={{ mb: 2 }}>
                {city}, {userState}
              </Grid>
              <Grid item sx={{ mb: 1 }}>
                <Box
                  component='img'
                  src='https://www.seekpng.com/png/detail/159-1595172_iceberg-badge-pixel-art.png'
                  sx={{ width: '40px', height: '40px', mr: 2 }}
                />
                <Box
                  component='img'
                  src='https://www.seekpng.com/png/detail/159-1595172_iceberg-badge-pixel-art.png'
                  sx={{ width: '40px', height: '40px', mr: 2 }}
                />
                <Box
                  component='img'
                  src='https://www.seekpng.com/png/detail/159-1595172_iceberg-badge-pixel-art.png'
                  sx={{ width: '40px', height: '40px' }}
                />
              </Grid>
              <Grid item sx={{ mb: 1 }}>
                This is where the user's description will go after we hook up
                the backend to accommodate this--maybe there's also an option to
                add a link to their profile, that could point towards some
                travel-oriented content like a blog or independent offered tour
                service.
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
