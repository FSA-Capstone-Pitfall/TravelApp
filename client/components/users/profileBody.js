import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../store/slices/usersSlice';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
        maxWidth: '1200px',
        gap: '0.5rem',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          border: '2px solid',
          borderColor: 'primary.main',
          backgroundColor: 'rgba(75,125,70, 0.6)',
        }}
      >
        <CardMedia
          component='img'
          sx={{ width: 250 }}
          image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFy1ZRj0Lz8HeiG73c2jlrHCWpKpxSlqT4Kg&usqp=CAU'
          alt='Live from space album cover'
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography
              component='div'
              variant='caption'
              sx={{ marginBottom: '0.3rem' }}
            >
              Featured Trip{' '}
            </Typography>
            <Typography variant='h4' color='primary' component='div'>
              Downtown Escape
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              component='div'
              sx={{ marginBottom: '1rem' }}
            >
              New York City{' '}
            </Typography>
            <Typography
              component='div'
              variant='body2'
              sx={{ fontStyle: 'italic', marginBottom: '1rem' }}
            >
              "Explore Dumbo, Brooklyn like a local by experiencing all the best
              food, shopping, and waterside activities in the neighborhood!"
            </Typography>
            <Typography component='div' color='secondary' variant='body2'>
              #dumbo #gowanus #brooklyn #bridge #food
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='caption'>
                  Upcoming Trips{' '}
                </Typography>
                <Card
                  sx={{
                    display: 'flex',
                    border: '1px solid',
                    borderColor: 'black',
                    flexGrow: 2,
                    padding: '8px',
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{ width: 75, height: 75 }}
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFy1ZRj0Lz8HeiG73c2jlrHCWpKpxSlqT4Kg&usqp=CAU'
                    alt='Live from space album cover'
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        component='div'
                      >
                        San Diego{' '}
                      </Typography>
                      <Typography component='div' color='black' variant='body2'>
                        Duration: 1 day
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
                <Card
                  sx={{
                    display: 'flex',
                    border: '1px solid',
                    borderColor: 'black',
                    flexGrow: 2,
                    padding: '8px',
                    width: '100%',
                    flexBasis: 0,
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{ width: 75, height: 75 }}
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFy1ZRj0Lz8HeiG73c2jlrHCWpKpxSlqT4Kg&usqp=CAU'
                    alt='Live from space album cover'
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        component='div'
                      >
                        Austin{' '}
                      </Typography>
                      <Typography component='div' color='black' variant='body2'>
                        Duration: 1 day
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
                <Card
                  sx={{
                    display: 'flex',
                    border: '1px solid',
                    borderColor: 'black',
                    flexGrow: 2,
                    padding: '8px',
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{ width: 75, height: 75 }}
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFy1ZRj0Lz8HeiG73c2jlrHCWpKpxSlqT4Kg&usqp=CAU'
                    alt='Live from space album cover'
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        component='div'
                      >
                        San Diego{' '}
                      </Typography>
                      <Typography component='div' color='black' variant='body2'>
                        Duration: 1 day
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='caption'>
                  My Curated Trips{' '}
                </Typography>
                {/* hi */}
                <Card
                  sx={{
                    display: 'flex',
                    border: '1px solid',
                    borderColor: 'black',
                    flexGrow: 2,
                    padding: '8px',
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{ width: 75, height: 75 }}
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFy1ZRj0Lz8HeiG73c2jlrHCWpKpxSlqT4Kg&usqp=CAU'
                    alt='Live from space album cover'
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        component='div'
                      >
                        New York City{' '}
                      </Typography>
                      <Typography component='div' color='black' variant='body2'>
                        Duration: 3 days
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
                {/* hi */}
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='caption'>
                  Wishlist{' '}
                </Typography>
                {/* hi */}
                <Card
                  sx={{
                    display: 'flex',
                    border: '1px solid',
                    borderColor: 'black',
                    flexGrow: 2,
                    padding: '8px',
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{ width: 75, height: 75 }}
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFy1ZRj0Lz8HeiG73c2jlrHCWpKpxSlqT4Kg&usqp=CAU'
                    alt='Live from space album cover'
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        component='div'
                      >
                        San Diego{' '}
                      </Typography>
                      <Typography component='div' color='black' variant='body2'>
                        Duration: 1 day
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
                {/* hi */}
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileColumn;
