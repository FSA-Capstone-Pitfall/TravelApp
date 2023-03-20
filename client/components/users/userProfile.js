import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../store/slices/usersSlice';
import { Box, Avatar } from '@mui/material';

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
    <Box>
      <Box
        sx={{
          mt: 1,
          ml: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Avatar src={imageUrl} sx={{ height: '200px', width: '200px' }} />
        <Box sx={{ mt: 2 }}>
          {firstName} {lastName}
        </Box>
        <Box>
          {city}, {userState}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box
            component='img'
            src='https://www.seekpng.com/png/detail/159-1595172_iceberg-badge-pixel-art.png'
            sx={{ width: '50px', height: '50px', mr: 2 }}
          />
          <Box
            component='img'
            src='https://www.seekpng.com/png/detail/159-1595172_iceberg-badge-pixel-art.png'
            sx={{ width: '50px', height: '50px', mr: 2 }}
          />
          <Box
            component='img'
            src='https://www.seekpng.com/png/detail/159-1595172_iceberg-badge-pixel-art.png'
            sx={{ width: '50px', height: '50px' }}
          />
        </Box>
        <Box
          sx={{
            borderColor: 'secondary.main',
            bgcolor: 'secondary.light',
            mt: 2,
            border: 1,
            width: '12rem',
            height: '5rem',
            borderRadius: '12px',
          }}
        >
          Hi, I'm Lisa!
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
