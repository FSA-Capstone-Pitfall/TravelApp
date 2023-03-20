import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
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
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/destinations', {
      state: {
        searchValue,
      },
    });
    setSearchValue('');
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
    >
      <StyledTextField
        id="search-destinations-form"
        variant="outlined"
        label="Where to"
        size={'small'}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        inputProps={{ style: { color: '#fff' } }}
      />
    </Box>
  );
};

export default SearchBar;