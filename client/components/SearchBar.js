import React, { useState } from 'react';
import {
  Box,
  InputAdornment,
  List,
  ListItemButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon } from '@mui/icons-material';
import { Close as CloseIcon } from '@mui/icons-material';

import { fetchDestinations } from '../store';
import { useNavigate } from 'react-router-dom';

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': { color: 'white' },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [renderDestinations, setRenderDestinations] = useState(false);

  const destinations = useSelector((state) => state.destinations.destinations);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(fetchDestinations({ identifier: searchValue }));
    setRenderDestinations(true);
  };

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
      onBlur={(event) => {
        setTimeout(() => setRenderDestinations(false), 100);
      }}
    >
      <StyledTextField
        id='search-destinations-form'
        variant='outlined'
        size={'small'}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
          setRenderDestinations(false);
        }}
        InputProps={{
          style: {
            color: '#fff',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon style={{ color: '#fff' }} />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment
              position='end'
              onClick={() => {
                setSearchValue('');
              }}
            >
              <CloseIcon style={{ color: '#fff' }} />
            </InputAdornment>
          ),
        }}
        onFocus={(event) => {
          if (searchValue && destinations.length) {
            setRenderDestinations(true);
          }
        }}
      />
      {renderDestinations && destinations.length && (
        <Paper style={{ position: 'absolute' }}>
          <List component='nav' aria-label='main mailbox folders'>
            {destinations.map((city) => (
              <List key={city.id}>
                <ListItemButton
                  onClick={() =>
                    navigate('/activities', {
                      state: {
                        cityId: city.id,
                        displayName: city.name,
                        imageUrl: city.imageUrl,
                      },
                    })
                  }
                >
                  <Typography
                    variant='body1'
                    align='center'
                    color='text.secondary'
                  >
                    {city.name}
                  </Typography>
                </ListItemButton>
                <List component='nav'>
                  {city.destinations.length &&
                    city.destinations.map((destination) => (
                      <ListItemButton
                        key={destination.id}
                        style={{ paddingLeft: '2rem' }}
                        onClick={() =>
                          navigate('/activities', {
                            state: {
                              destinationId: destination.id,
                              displayName: destination.name,
                              description: destination.description,
                              imageUrl: destination.imageUrl,
                              googleMap: destination.googleMap,
                            },
                          })
                        }
                      >
                        <Typography
                          variant='body1'
                          align='center'
                          color='text.secondary'
                        >
                          {destination.name}
                        </Typography>
                      </ListItemButton>
                    ))}
                </List>
              </List>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
