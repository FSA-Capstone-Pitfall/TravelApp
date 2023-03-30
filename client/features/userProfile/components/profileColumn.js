import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../../store/slices/usersSlice';
import { Box, Avatar, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';

const ProfileColumn = () => {
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
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        maxWidth: '300px',
        gap: '0.5rem',
        border: '1px solid #ccc',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
        borderRadius: 5,
        padding: 3,
      }}
    >
      <Avatar src={imageUrl} sx={{ height: '225px', width: '225px', mb: 1 }} />
      <Box
        component='div'
        sx={{
          textAlign: 'left',
          display: 'block',
          marginBottom: '-8px',
          marginTop: 1,
        }}
      >
        <Typography variant='overline'>
          <PersonIcon color='secondary' fontSize='inherit' /> {firstName}{' '}
          {lastName}
        </Typography>
      </Box>
      <Box component='div' sx={{ textAlign: 'left', display: 'block' }}>
        <Typography variant='overline'>
          <PlaceIcon color='secondary' fontSize='inherit' /> {city}, {userState}
        </Typography>
      </Box>
      {/* <Box component='div' sx={{ textAlign: 'left', display: 'block', mb: 1 }}>
        <Typography variant='caption'></Typography>
      </Box> */}

      <Box component='div' sx={{ textAlign: 'left', display: 'block', mt: 1 }}>
        {' '}
        <Box component='a' href='https://www.facebook.com/'>
          <FacebookIcon fontSize='large' color='secondary' />
        </Box>
        <Box component='a' href='https://twitter.com/'>
          <TwitterIcon fontSize='large' color='secondary' />
        </Box>
        <Box component='a' href='https://www.instagram.com/'>
          <InstagramIcon fontSize='large' color='secondary' />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileColumn;
