import React, { useState } from 'react';
import { Box, InputAdornment, List, ListItemButton, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Backspace as BackspaceIcon } from '@mui/icons-material';

import { fetchDestinations } from '../store';

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
  const [renderDestinations, setRenderDestinations] = useState(false);

  const destinations = useSelector((state) => state.destinations.destinations);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(fetchDestinations({ identifier: searchValue }));
    setRenderDestinations(true);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      onBlur={() => setRenderDestinations(false)}
    >
      <StyledTextField
        id="search-destinations-form"
        variant="outlined"
        size={'small'}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
          setRenderDestinations(false);
        }}
        InputProps={{
          style: { color: '#fff' },
          endAdornment:
            (
              <InputAdornment position="end" onClick={() => {
                setSearchValue('');
              }}>
                <BackspaceIcon style={{ color: '#fff' }} />
              </InputAdornment>
            )
        }}
        onFocus={(event) => {
          if (searchValue && destinations.length) {
            setRenderDestinations(true);
          }
        }}
      />
      {renderDestinations && destinations.length &&
        <Paper style={{ position: 'absolute' }}>
          <List component="nav" aria-label="main mailbox folders">
            {destinations.map(city => <List key={city.id}>
                <ListItemButton onClick={() => console.log('redirecting to city activities')}>
                  <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                  >
                    {city.name}
                  </Typography>
                </ListItemButton>
                <List component="nav">
                  {city.destinations.length && city.destinations.map(destination =>
                    <ListItemButton key={destination.id}
                                    style={{ paddingLeft: '2rem' }}
                                    onClick={() => console.log('redirecting to destination activities')}>
                      <Typography
                        variant="body1"
                        align="center"
                        color="text.secondary"
                      >
                        {destination.name}
                      </Typography>
                    </ListItemButton>)}
                </List>
              </List>,
            )}
          </List>
        </Paper>
      }
    </Box>
  );
};

export default SearchBar;