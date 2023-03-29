import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../../store/slices/usersSlice';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ProfileBody = () => {
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
        maxWidth: '1200px',
        gap: '0.5rem',
      }}
    ></Box>
  );
};

export default ProfileBody;
